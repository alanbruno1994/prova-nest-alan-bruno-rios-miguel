import { UpdateGameInput } from './dto/update-game.input';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { Game } from './game.entity';
import { validate } from 'class-validator';

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
    const game = await this.gameRepository.findOne(id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    await this.gameRepository.update(id, { ...data });
    const gameUpdate = await this.gameRepository.create({ ...game, ...data });
    return gameUpdate;
  }

  async deleteGame(id: number): Promise<boolean> {
    const game = await this.gameRepository.findOne(id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    const gameDelete = await this.gameRepository.delete(id);
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

  async findByTypeGame(typeGame: string) {
    const game = await this.gameRepository.findOne({ where: { typeGame } });
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
