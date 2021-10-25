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

@Injectable({ scope: Scope.REQUEST })
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
    @Inject(CONTEXT) private context,
    private gameService: GameService,
  ) {}

  async createBet(data: CreateBetInput): Promise<Bet[]> {
    return await this.forBets(data, this.context.req.user.id);
  }

  async forBets(data: CreateBetInput, userID: number): Promise<Bet[]> {
    let betsSaved: Bet[] = [];
    return new Promise<Bet[]>(async (resolve, reject) => {
      let bets = data[0].bets;
      await bets.forEach(async (v: Bets, index, array) => {
        await this.save(v, betsSaved, userID);
        if (array.length === index + 1) {
          resolve(betsSaved);
        }
      });
    });
  }

  async save(value: Bets, betsSave: Bet[], userId): Promise<Bet[]> {
    let game = await this.gameService.findById(value.gameId);
    const bet = await this.betRepository.create({
      gameId: game.id,
      numberChoose: value.numberChoose,
      priceGame: game.price,
      userId,
    });
    const betSaved = await this.betRepository.save(bet);
    if (!betSaved) {
      throw new InternalServerErrorException('Bet not created');
    }
    betsSave.push(betSaved);
    return betsSave;
  }

  async updateBet(id: number, data: UpdateBetInput): Promise<Bet> {
    const bet = await this.findById(id);
    await this.betRepository.update(bet, { ...data });
    const betUpdate = await this.betRepository.create({ ...bet, ...data });
    return betUpdate;
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
