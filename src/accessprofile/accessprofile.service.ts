import { UpdateAccessProfileInput } from './dto/update-access-profile.input';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccessProfileInput } from './dto/create-acess-profile.input';
import { AcessProfile } from './accessprofile.entity';

@Injectable() //Aqui e para fazer injecao de dependecnia
export class AccessprofileService {
  constructor(
    @InjectRepository(AcessProfile)
    private accessRepository: Repository<AcessProfile>,
  ) {}

  async createAccessProfile(
    data: CreateAccessProfileInput,
  ): Promise<AcessProfile> {
    const access = await this.accessRepository.create(data);
    const accessSaved = await this.accessRepository.save(access);
    if (!accessSaved) {
      throw new InternalServerErrorException('Access profile not created');
    }
    return accessSaved;
  }

  async updateAccessProfile(
    id: number,
    data: UpdateAccessProfileInput,
  ): Promise<AcessProfile> {
    const access = await this.accessRepository.findOne(id);
    if (!access) {
      throw new NotFoundException('Access profile not found');
    }
    await this.accessRepository.update(id, { ...data });
    const accessUpdate = await this.accessRepository.create({
      ...access,
      ...data,
    });
    return accessUpdate;
  }

  async deleteAccessProfile(id: number): Promise<boolean> {
    const access = await this.accessRepository.findOne(id);
    if (!access) {
      throw new NotFoundException('Access profile not found');
    }
    const accessDelete = await this.accessRepository.delete(access);
    if (accessDelete) {
      return true;
    }
    return false;
  }

  async findById(id: number) {
    const access = await this.accessRepository.findOne(id);
    if (!access) {
      throw new NotFoundException('Access profile not found');
    }
    return access;
  }

  async findByLevel(level: string) {
    const access = await this.accessRepository.findOne({ where: { level } });
    if (!access) {
      throw new NotFoundException('Access profile not found');
    }
    return access;
  }

  async findAllAccessProfile(): Promise<AcessProfile[]> {
    const access = await this.accessRepository.find();
    return access;
  }
}
