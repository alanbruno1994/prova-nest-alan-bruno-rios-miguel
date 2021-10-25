import { UpdateUserInput } from './dto/update-user.input';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { AccessprofileService } from 'src/accessprofile/accessprofile.service';

@Injectable() //Aqui e para fazer injecao de dependecnia
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private accessService: AccessprofileService,
  ) {}

  async createUser(data: CreateUserInput): Promise<User> {
    let access = await this.accessService.findByLevel('client');
    const user = await this.userRepository.create({
      ...data,
      accessProfileId: access.id,
    });
    const userSaved = await this.userRepository.save(user);
    if (!userSaved) {
      throw new InternalServerErrorException('User not created');
    }
    return userSaved;
  }

  async createUserAdmin(data: CreateUserInput): Promise<User> {
    let access = await this.accessService.findByLevel('admin');
    const user = await this.userRepository.create({
      ...data,
      accessProfileId: access.id,
    });
    const userSaved = await this.userRepository.save(user);
    if (!userSaved) {
      throw new InternalServerErrorException('User not created');
    }
    return userSaved;
  }

  async updateUser(id: number, data: UpdateUserInput): Promise<User> {
    const user = await this.findById(id);
    await this.userRepository.update(user, { ...data });
    const userUpdate = await this.userRepository.create({ ...user, ...data });
    return userUpdate;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.findById(id);
    const userDelete = await this.userRepository.delete(user);
    if (userDelete) {
      return true;
    }
    return false;
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
