import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBetInput, Bets } from './dto/create-bet.input';
import { Bet } from './bet.entity';
import { UpdateBetInput } from './dto/update-bet.input';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
  ) {}

  async createBet(data: CreateBetInput): Promise<Bet[]> {
    return await this.forBets(data.bets);
  }

  async forBets(bets: Bets[]): Promise<Bet[]> {
    let betsSaved: Bet[] = [];
    return new Promise<Bet[]>(async (resolve, reject) => {
      bets.forEach(async (v: Bets) => {
        const bet = await this.betRepository.create(v);
        const betSaved = await this.betRepository.save(bet);
        if (!betSaved) {
          throw new InternalServerErrorException('Bet not created');
        }
        betsSaved.push(betSaved);
      });
      resolve(betsSaved);
    });
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
