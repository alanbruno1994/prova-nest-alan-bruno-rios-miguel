import { UserService } from './../user/user.service';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBetInput } from './dto/create-bet.input';
import { Bet } from './bet.entity';
import { UpdateBetInput } from './dto/update-bet.input';
import { GameService } from '../game/game.service';
import { getConnection } from 'typeorm';

export class BetService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
    private gameService: GameService,
    private userService: UserService,
  ) {}

  async createBet(data: CreateBetInput, userId: number): Promise<Bet[]> {
    let user = await this.userService.findById(userId);
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let bets: Bet[] = [];
    for (let bet of data.bets) {
      let game = await this.gameService.findById(bet.gameId);
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
        userId,
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
    const bet = await this.betRepository.findOne(id);
    if (!bet) {
      throw new NotFoundException('Bet not found');
    }
    if (data.gameId) {
      let game = await this.gameService.findById(data.gameId);
      if (data.numberChoose) {
        if (!this.validateNumber(game.range, bet.numberChoose)) {
          throw new InternalServerErrorException(
            'Bet not created due to poorly formatted number',
          );
        }
      }
      await this.betRepository.update(id, { ...data, priceGame: game.price });
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
    const bet = await this.betRepository.findOne(id);
    if (!bet) {
      throw new NotFoundException('Bet not found');
    }
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
