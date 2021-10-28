import { UniqueGame } from './validator/UniqueGame';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { Game } from './game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, ValidationPipe } from '@nestjs/common';
import { AccessprofileModule } from '../accessprofile/accessprofile.module';
import { Validator } from 'class-validator';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), AccessprofileModule],
  providers: [GameService, GameResolver, Validator, ValidationPipe, UniqueGame],
  exports: [GameService],
})
export class GameModule {}
