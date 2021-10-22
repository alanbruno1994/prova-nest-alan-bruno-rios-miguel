import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { Game } from './game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GameService, GameResolver],
})
export class GameModule {}
