import { AcessProfile } from './../accessprofile/accessprofile.entity';
import { AccessprofileService } from './../accessprofile/accessprofile.service';
import { User } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { Game } from './../game/game.entity';
import { GameService } from './../game/game.service';
import { BetService } from './bet.service';
import { Bet } from './bet.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/test/TestUtil';
import { NotFoundException } from '@nestjs/common';
import mock from '../common/test/Mock';

describe('Game Service', () => {
  let service: BetService;
  const mockRepositoryGame = mock();
  const mockRepositoryBet = mock();
  const mockRepositoryUser = mock();
  const mockRepositoryAccess = mock();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BetService,
        {
          provide: getRepositoryToken(Bet),
          useValue: mockRepositoryBet,
        },
        GameService,
        {
          provide: getRepositoryToken(Game),
          useValue: mockRepositoryGame,
        },
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepositoryUser,
        },
        AccessprofileService,
        {
          provide: getRepositoryToken(AcessProfile),
          useValue: mockRepositoryAccess,
        },
      ],
    }).compile();

    service = module.get<BetService>(BetService);
  });

  beforeEach(() => {
    mockRepositoryGame.find.mockReset();
    mockRepositoryGame.findOne.mockReset();
    mockRepositoryGame.create.mockReset();
    mockRepositoryGame.save.mockReset();
    mockRepositoryGame.update.mockReset();
    mockRepositoryGame.delete.mockReset();
    mockRepositoryBet.find.mockReset();
    mockRepositoryBet.findOne.mockReset();
    mockRepositoryBet.create.mockReset();
    mockRepositoryBet.save.mockReset();
    mockRepositoryBet.update.mockReset();
    mockRepositoryBet.delete.mockReset();
    mockRepositoryUser.find.mockReset();
    mockRepositoryUser.findOne.mockReset();
    mockRepositoryUser.create.mockReset();
    mockRepositoryUser.save.mockReset();
    mockRepositoryUser.update.mockReset();
    mockRepositoryUser.delete.mockReset();
  });

  describe('When search all games', () => {
    it('should be list all games', async () => {
      const betOne = TestUtil.betOne();
      const betTwo = TestUtil.betTwo();
      mockRepositoryBet.find.mockReturnValue([betOne, betTwo]);
      const users = await service.findAllBets();
      expect(users).toHaveLength(2);
      expect(mockRepositoryBet.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search bet by id', () => {
    it('Should find a existing bet', async () => {
      const bet = TestUtil.betOne();
      mockRepositoryBet.findOne.mockReturnValue(bet);
      const betFound = await service.findById(1);
      expect(betFound).toMatchObject(bet);
      expect(mockRepositoryBet.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not to find a bet', async () => {
      mockRepositoryBet.findOne.mockReturnValue(null);
      expect(service.findById(3)).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepositoryBet.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When update bet', () => {
    it('Should update a bet', async () => {
      mockRepositoryGame.findOne.mockReturnValue(TestUtil.gameOne());
      const bet = TestUtil.betOne();
      const updatedBet = { numberChoose: '01,23,45,56,32' };
      mockRepositoryBet.findOne.mockReturnValue(bet);
      mockRepositoryBet.update.mockReturnValue({
        ...bet,
        ...updatedBet,
      });
      mockRepositoryBet.create.mockReturnValue({
        ...bet,
        ...updatedBet,
      });

      const resultUser = await service.updateBet(1, {
        ...bet,
        numberChoose: '01,23,32,45,56,32',
      });

      expect(resultUser).toMatchObject(updatedBet);
      expect(mockRepositoryBet.create).toBeCalledTimes(1);
      expect(mockRepositoryBet.findOne).toBeCalledTimes(1);
      expect(mockRepositoryBet.update).toBeCalledTimes(1);
    });
    it('Should update a bet failure', async () => {
      mockRepositoryBet.findOne.mockReturnValue(null);
      expect(
        service.updateBet(3, { numberChoose: '01,50,23,45,56,32' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('When delete bet', () => {
    it('Should delete a existing bet', async () => {
      const bet = TestUtil.betOne();
      mockRepositoryBet.findOne.mockReturnValue(bet);
      mockRepositoryBet.delete.mockReturnValue(bet);
      const deletedUser = await service.deleteBet(1);
      expect(deletedUser).toBe(true);
      expect(mockRepositoryBet.findOne).toBeCalledTimes(1);
      expect(mockRepositoryBet.delete).toBeCalledTimes(1);
    });

    it('Should not delete a bet', async () => {
      const bet = TestUtil.betOne();
      mockRepositoryBet.delete.mockReturnValue(null);
      mockRepositoryBet.findOne.mockReturnValue(bet);
      const deletedBet = await service.deleteBet(1);
      expect(deletedBet).toBe(false);
      expect(mockRepositoryBet.findOne).toBeCalledTimes(1);
      expect(mockRepositoryBet.delete).toBeCalledTimes(1);
    });

    it('Should delete failure delete a game', async () => {
      mockRepositoryBet.findOne.mockReturnValue(null);
      expect(service.deleteBet(1)).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
