import { UpdateGameInput } from './dto/update-game.input';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { Game } from './game.entity';

@Injectable() //Aqui e para fazer injecao de dependecnia
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async creatGame(data: CreateGameInput): Promise<Game> {
    const game = await this.gameRepository.create(data);
    const gameSaved = await this.gameRepository.save(game);
    if (!gameSaved) {
      throw new InternalServerErrorException('Game not created');
    }
    return gameSaved;
  }

  async updateGame(id: number, data: UpdateGameInput): Promise<Game> {
    const game = await this.findById(id);
    await this.gameRepository.update(game, { ...data });
    const gameUpdate = await this.gameRepository.create({ ...game, ...data });
    return gameUpdate;
  }

  async deleteGame(id: number): Promise<boolean> {
    const game = await this.findById(id);
    const gameDelete = await this.gameRepository.delete(game);
    if (gameDelete) {
      return true;
    }
    return false;
  }

  async findById(id: number) {
    const game = await this.gameRepository.findOne(id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }

  async findAllGame(): Promise<Game[]> {
    const games = await this.gameRepository.find();
    return games;
  }
}
