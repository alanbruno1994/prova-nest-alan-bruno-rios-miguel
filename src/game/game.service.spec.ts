import { Game } from './game.entity';
import { GameService } from './game.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/test/TestUtil';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import mock from '../common/test/Mock';

describe('Game Service', () => {
  let service: GameService;

  const mockRepositoryGame = mock();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getRepositoryToken(Game),
          useValue: mockRepositoryGame,
        },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  beforeEach(() => {
    mockRepositoryGame.find.mockReset();
    mockRepositoryGame.findOne.mockReset();
    mockRepositoryGame.create.mockReset();
    mockRepositoryGame.save.mockReset();
    mockRepositoryGame.update.mockReset();
    mockRepositoryGame.delete.mockReset();
  });

  describe('When search all games', () => {
    it('should be list all games', async () => {
      const gameOne = TestUtil.gameOne();
      const gameTwo = TestUtil.gameTwo();
      mockRepositoryGame.find.mockReturnValue([gameOne, gameTwo]);
      const users = await service.findAllGame();
      expect(users).toHaveLength(2);
      expect(mockRepositoryGame.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When serch game by id', () => {
    it('Should find a existing game', async () => {
      const game = TestUtil.gameOne();
      mockRepositoryGame.findOne.mockReturnValue(game);
      const gameFound = await service.findById(1);
      expect(gameFound).toMatchObject(game);
      expect(mockRepositoryGame.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not to find a game', async () => {
      mockRepositoryGame.findOne.mockReturnValue(null);
      expect(service.findById(3)).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepositoryGame.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When create game', () => {
    it('should create a game', async () => {
      const game = TestUtil.gameOne();
      mockRepositoryGame.save.mockReturnValue(game);
      mockRepositoryGame.create.mockReturnValue(game);
      const savedUser = await service.creatGame(game);
      expect(savedUser).toMatchObject(game);
      expect(mockRepositoryGame.create).toBeCalledTimes(1);
      expect(mockRepositoryGame.save).toBeCalledTimes(1);
    });
    it('should return a exception when doesnt create a game', async () => {
      const game = TestUtil.gameOne();
      mockRepositoryGame.save.mockReturnValue(null);
      await service.creatGame(game).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Game not created',
        });
      });
      expect(mockRepositoryGame.create).toBeCalledTimes(1);
      expect(mockRepositoryGame.save).toBeCalledTimes(1);
    });
  });

  describe('When update game', () => {
    it('Should update a game', async () => {
      const game = TestUtil.gameOne();
      const updatedUser = { typeGame: 'libra' };
      mockRepositoryGame.findOne.mockReturnValue(game);
      mockRepositoryGame.update.mockReturnValue({
        ...game,
        ...updatedUser,
      });
      mockRepositoryGame.create.mockReturnValue({
        ...game,
        ...updatedUser,
      });

      const resultUser = await service.updateGame(1, {
        ...game,
        typeGame: 'libra',
      });

      expect(resultUser).toMatchObject(updatedUser);
      expect(mockRepositoryGame.create).toBeCalledTimes(1);
      expect(mockRepositoryGame.findOne).toBeCalledTimes(1);
      expect(mockRepositoryGame.update).toBeCalledTimes(1);
    });
    it('Should update a game failure', async () => {
      mockRepositoryGame.findOne.mockReturnValue(null);
      expect(
        service.updateGame(3, { typeGame: 'libra' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('When delete game', () => {
    it('Should delete a existing game', async () => {
      const game = TestUtil.gameOne();
      mockRepositoryGame.findOne.mockReturnValue(game);
      mockRepositoryGame.delete.mockReturnValue(game);
      const deletedUser = await service.deleteGame(1);
      expect(deletedUser).toBe(true);
      expect(mockRepositoryGame.findOne).toBeCalledTimes(1);
      expect(mockRepositoryGame.delete).toBeCalledTimes(1);
    });

    it('Should not delete a game', async () => {
      const game = TestUtil.gameOne();
      mockRepositoryGame.delete.mockReturnValue(null);
      mockRepositoryGame.findOne.mockReturnValue(game);
      const deletedUser = await service.deleteGame(1);
      expect(deletedUser).toBe(false);
      expect(mockRepositoryGame.findOne).toBeCalledTimes(1);
      expect(mockRepositoryGame.delete).toBeCalledTimes(1);
    });

    it('Should delete failure delete a game', async () => {
      mockRepositoryGame.findOne.mockReturnValue(null);
      expect(service.deleteGame(1)).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
