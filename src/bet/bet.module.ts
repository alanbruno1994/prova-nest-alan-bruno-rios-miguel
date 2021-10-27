import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { GameModule } from './../game/game.module';
import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BetResolver } from './bet.resolver';
import { Bet } from './bet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessprofileModule } from '../accessprofile/accessprofile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bet]),
    GameModule,
    UserModule,
    AuthModule,
    AccessprofileModule,
  ],
  providers: [BetService, BetResolver],
  exports: [BetService],
})
export class BetModule {}
