import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bets, CreateBetInput } from './dto/create-bet.input';
import { Bet } from './bet.entity';
import { UpdateBetInput } from './dto/update-bet.input';
import { CONTEXT } from '@nestjs/graphql';
import { GameService } from 'src/game/game.service';
import { getConnection } from 'typeorm';

interface Action {
  code: number;
  bets: Bet[];
}

@Injectable({ scope: Scope.REQUEST })
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
    @Inject(CONTEXT) private context,
    private gameService: GameService,
  ) {}

  async createBet(data: CreateBetInput): Promise<Bet[]> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let bets: Bet[] = [];
    for (let bet of data[0].bets) {
      let game = await this.gameService.findById(bet.gameId);
      if (!game) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Game not found');
      }
      if (!this.validateNumber(game.range, bet.numberChoose)) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException(
          'Bet not created due to poorly formatted number',
        );
      }
      const betCreate = await this.betRepository.create({
        gameId: game.id,
        numberChoose: bet.numberChoose,
        priceGame: game.price,
        userId: this.context.req.user.id,
      });
      await queryRunner.manager.save(betCreate);
      bets.push(betCreate);
    }
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return bets;
  }

  validateNumber(qtd: number, numberChoose: string) {
    return numberChoose.match(/\d+/g).length === qtd;
  }

  async updateBet(id: number, data: UpdateBetInput): Promise<Bet> {
    const bet = await this.findById(id);
    if (data.gameId) {
      let game = await this.gameService.findById(data.gameId);
      if (!game) {
        throw new InternalServerErrorException('Game not found');
      }
      if (data.numberChoose) {
        if (!this.validateNumber(game.range, bet.numberChoose)) {
          throw new InternalServerErrorException(
            'Bet not created due to poorly formatted number',
          );
        }
      }
      await this.betRepository.update(bet, { ...data, priceGame: game.price });
      const betUpdate = await this.betRepository.create({
        ...bet,
        ...data,
        priceGame: game.price,
      });
      return betUpdate;
    } else {
      await this.betRepository.update(bet, { ...data });
      const betUpdate = await this.betRepository.create({ ...bet, ...data });
      return betUpdate;
    }
  }

  async deleteBet(id: number): Promise<boolean> {
    const bet = await this.findById(id);
    const betDelete = await this.betRepository.delete(bet);
    if (betDelete) {
      return true;
    }
    return false;
  }

  async findById(id: number) {
    const bet = await this.betRepository.findOne(id);
    if (!bet) {
      throw new NotFoundException('Bet not found');
    }
    return bet;
  }

  async findAllBets(): Promise<Bet[]> {
    const users = await this.betRepository.find();
    return users;
  }
}
