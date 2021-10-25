import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { Game } from './game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AccessprofileModule } from 'src/accessprofile/accessprofile.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), AccessprofileModule],
  providers: [GameService, GameResolver],
  exports: [GameService],
})
export class GameModule {}
