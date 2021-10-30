import { AccessprofileService } from './../accessprofile/accessprofile.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

import { AcessProfile } from '../accessprofile/accessprofile.entity';
import TestUtil from '../common/test/TestUtil';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import mock from '../common/test/Mock';

describe('UserService', () => {
  let service: UserService;
  const mockRepositoryUser = mock();
  const mockRepositoryProfile = mock();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepositoryUser,
        },
        AccessprofileService,
        {
          provide: getRepositoryToken(AcessProfile),
          useValue: mockRepositoryProfile,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    mockRepositoryUser.find.mockReset();
    mockRepositoryUser.findOne.mockReset();
    mockRepositoryUser.create.mockReset();
    mockRepositoryUser.save.mockReset();
    mockRepositoryUser.update.mockReset();
    mockRepositoryUser.delete.mockReset();
    mockRepositoryProfile.find.mockReset();
    mockRepositoryProfile.findOne.mockReset();
    mockRepositoryProfile.create.mockReset();
    mockRepositoryProfile.save.mockReset();
    mockRepositoryProfile.update.mockReset();
    mockRepositoryProfile.delete.mockReset();
  });

  describe('When search All Users', () => {
    it('should be list all users', async () => {
      const userOne = TestUtil.userOne();
      const userTwo = TestUtil.userTwo();
      mockRepositoryUser.find.mockReturnValue([userOne, userTwo]);
      const users = await service.findAllUsers();
      expect(users).toHaveLength(2);
      expect(mockRepositoryUser.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When serch user by id', () => {
    it('Should find a existing user', async () => {
      const user = TestUtil.userOne();
      mockRepositoryUser.findOne.mockReturnValue(user);
      const userFound = await service.findById(1);
      expect(userFound).toMatchObject(user);
      expect(mockRepositoryUser.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not to find a user', async () => {
      mockRepositoryUser.findOne.mockReturnValue(null);
      expect(service.findById(3)).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepositoryUser.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search user by email', () => {
    it('Should find a existing user', async () => {
      const user = TestUtil.userOne();
      mockRepositoryUser.findOne.mockReturnValue(user);
      const userFound = await service.getUserByEmail(user.email);
      expect(userFound).toMatchObject(user);
      expect(mockRepositoryUser.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not to find a user', async () => {
      mockRepositoryUser.findOne.mockReturnValue(null);
      expect(service.getUserByEmail('teste@gmail.com')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepositoryUser.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When create user player', () => {
    it('should create a user player', async () => {
      const user = TestUtil.userTwo();
      const access = TestUtil.accessProfilePlayer();
      mockRepositoryProfile.findOne.mockReturnValue(access);
      mockRepositoryUser.save.mockReturnValue(user);
      mockRepositoryUser.create.mockReturnValue(user);
      const savedUser = await service.createUser({...user,passwordConfirmation:user.password});
      expect(savedUser).toMatchObject(user);
      expect(mockRepositoryUser.create).toBeCalledTimes(1);
      expect(mockRepositoryUser.save).toBeCalledTimes(1);
    });
    it('should return a exception when doesnt create a user player', async () => {
      const user = TestUtil.userTwo();
      const access = TestUtil.accessProfilePlayer();
      mockRepositoryProfile.findOne.mockReturnValue(access);
      mockRepositoryUser.save.mockReturnValue(null);
      await service.createUser({...user,passwordConfirmation:user.password}).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'User not created',
        });
      });
      expect(mockRepositoryUser.create).toBeCalledTimes(1);
      expect(mockRepositoryUser.save).toBeCalledTimes(1);
    });
  });

  describe('When create user admin', () => {
    it('should create a user admin', async () => {
      const user = TestUtil.userOne();
      const access = TestUtil.accessProfileAdmin();
      mockRepositoryProfile.findOne.mockReturnValue(access);
      mockRepositoryUser.save.mockReturnValue(user);
      mockRepositoryUser.create.mockReturnValue(user);
      const savedUser = await service.createUserAdmin({...user,passwordConfirmation:user.password});
      expect(savedUser).toMatchObject(user);
      expect(mockRepositoryUser.create).toBeCalledTimes(1);
      expect(mockRepositoryUser.save).toBeCalledTimes(1);
    });
    it('should return a exception when doesnt create a user player', async () => {
      const user = TestUtil.userOne();
      const access = TestUtil.accessProfileAdmin();
      mockRepositoryProfile.findOne.mockReturnValue(access);
      mockRepositoryUser.save.mockReturnValue(null);
      await service.createUserAdmin({...user,passwordConfirmation:user.password}).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'User not created',
        });
      });
      expect(mockRepositoryUser.create).toBeCalledTimes(1);
      expect(mockRepositoryUser.save).toBeCalledTimes(1);
    });
  });

  describe('When update User', () => {
    it('Should update a user', async () => {
      const user = TestUtil.userOne();
      const updatedUser = { email: 'emailNew@gmail.com' };
      mockRepositoryUser.findOne.mockReturnValue(user);
      mockRepositoryUser.update.mockReturnValue({
        ...user,
        ...updatedUser,
      });
      mockRepositoryUser.create.mockReturnValue({
        ...user,
        ...updatedUser,
      });

      const resultUser = await service.updateUser(1, {
        ...user,
        email: 'emailNew@gmail.com',
      });

      expect(resultUser).toMatchObject(updatedUser);
      expect(mockRepositoryUser.create).toBeCalledTimes(1);
      expect(mockRepositoryUser.findOne).toBeCalledTimes(1);
      expect(mockRepositoryUser.update).toBeCalledTimes(1);
    });
    it('Should update a user failure', async () => {
      mockRepositoryUser.findOne.mockReturnValue(null);
      expect(
        service.updateUser(3, { email: 'teste@gmail.com' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('When delete User', () => {
    it('Should delete a existing user', async () => {
      const user = TestUtil.userOne();
      mockRepositoryUser.findOne.mockReturnValue(user);
      mockRepositoryUser.delete.mockReturnValue(user);
      const deletedUser = await service.deleteUser(1);
      expect(deletedUser).toBe(true);
      expect(mockRepositoryUser.findOne).toBeCalledTimes(1);
      expect(mockRepositoryUser.delete).toBeCalledTimes(1);
    });

    it('Should not delete a user', async () => {
      const user = TestUtil.userOne();
      mockRepositoryUser.delete.mockReturnValue(null);
      mockRepositoryUser.findOne.mockReturnValue(user);
      const deletedUser = await service.deleteUser(1);
      expect(deletedUser).toBe(false);
      expect(mockRepositoryUser.findOne).toBeCalledTimes(1);
      expect(mockRepositoryUser.delete).toBeCalledTimes(1);
    });

    it('Should delete failure delete a user', async () => {
      const user = TestUtil.userOne();
      mockRepositoryUser.findOne.mockReturnValue(null);
      expect(service.deleteUser(1)).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
