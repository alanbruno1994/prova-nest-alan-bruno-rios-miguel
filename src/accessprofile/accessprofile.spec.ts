import { AccessprofileService } from './accessprofile.service';
import { AcessProfile } from './accessprofile.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/test/TestUtil';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import mock from '../common/test/Mock';

describe('Game Service', () => {
  let service: AccessprofileService;

  const mockRepositoryAccess = mock();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessprofileService,
        {
          provide: getRepositoryToken(AcessProfile),
          useValue: mockRepositoryAccess,
        },
      ],
    }).compile();

    service = module.get<AccessprofileService>(AccessprofileService);
  });

  beforeEach(() => {
    mockRepositoryAccess.find.mockReset();
    mockRepositoryAccess.findOne.mockReset();
    mockRepositoryAccess.create.mockReset();
    mockRepositoryAccess.save.mockReset();
    mockRepositoryAccess.update.mockReset();
    mockRepositoryAccess.delete.mockReset();
  });

  describe('When search all access', () => {
    it('should be list all access', async () => {
      const accessOne = TestUtil.accessProfileAdmin();
      const accessTwo = TestUtil.accessProfilePlayer();
      mockRepositoryAccess.find.mockReturnValue([accessOne, accessTwo]);
      const access = await service.findAllAccessProfile();
      expect(access).toHaveLength(2);
      expect(mockRepositoryAccess.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search access by id', () => {
    it('Should find a existing access', async () => {
      const access = TestUtil.accessProfilePlayer();
      mockRepositoryAccess.findOne.mockReturnValue(access);
      const accessFound = await service.findById(1);
      expect(accessFound).toMatchObject(access);
      expect(mockRepositoryAccess.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not to find a access profile', async () => {
      mockRepositoryAccess.findOne.mockReturnValue(null);
      expect(service.findById(3)).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepositoryAccess.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When create access', () => {
    it('should create a access', async () => {
      const access = TestUtil.accessProfilePlayer();
      mockRepositoryAccess.save.mockReturnValue(access);
      mockRepositoryAccess.create.mockReturnValue(access);
      const savedUser = await service.createAccessProfile(access);
      expect(savedUser).toMatchObject(access);
      expect(mockRepositoryAccess.create).toBeCalledTimes(1);
      expect(mockRepositoryAccess.save).toBeCalledTimes(1);
    });
    it('should return a exception when doesnt create a access', async () => {
      const access = TestUtil.accessProfilePlayer();
      mockRepositoryAccess.save.mockReturnValue(null);
      await service.createAccessProfile(access).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Access profile not created',
        });
      });
      expect(mockRepositoryAccess.create).toBeCalledTimes(1);
      expect(mockRepositoryAccess.save).toBeCalledTimes(1);
    });
  });

  describe('When update access', () => {
    it('Should update a access', async () => {
      const access = TestUtil.accessProfilePlayer();
      const updatedAccess = { level: 'client' };
      mockRepositoryAccess.findOne.mockReturnValue(access);
      mockRepositoryAccess.update.mockReturnValue({
        ...access,
        ...updatedAccess,
      });
      mockRepositoryAccess.create.mockReturnValue({
        ...access,
        ...updatedAccess,
      });

      const resultUser = await service.updateAccessProfile(1, {
        ...access,
        level: 'client',
      });

      expect(resultUser).toMatchObject(updatedAccess);
      expect(mockRepositoryAccess.create).toBeCalledTimes(1);
      expect(mockRepositoryAccess.findOne).toBeCalledTimes(1);
      expect(mockRepositoryAccess.update).toBeCalledTimes(1);
    });
    it('Should update a game failure', async () => {
      mockRepositoryAccess.findOne.mockReturnValue(null);
      expect(
        service.updateAccessProfile(3, { level: 'client' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('When delete access', () => {
    it('Should delete a existing access', async () => {
      const access = TestUtil.accessProfilePlayer();
      mockRepositoryAccess.findOne.mockReturnValue(access);
      mockRepositoryAccess.delete.mockReturnValue(access);
      const deletedUser = await service.deleteAccessProfile(1);
      expect(deletedUser).toBe(true);
      expect(mockRepositoryAccess.findOne).toBeCalledTimes(1);
      expect(mockRepositoryAccess.delete).toBeCalledTimes(1);
    });

    it('Should not delete a access', async () => {
      const access = TestUtil.accessProfilePlayer();
      mockRepositoryAccess.delete.mockReturnValue(null);
      mockRepositoryAccess.findOne.mockReturnValue(access);
      const deletedUser = await service.deleteAccessProfile(1);
      expect(deletedUser).toBe(false);
      expect(mockRepositoryAccess.findOne).toBeCalledTimes(1);
      expect(mockRepositoryAccess.delete).toBeCalledTimes(1);
    });

    it('Should delete failure delete a access', async () => {
      mockRepositoryAccess.findOne.mockReturnValue(null);
      expect(service.deleteAccessProfile(1)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
