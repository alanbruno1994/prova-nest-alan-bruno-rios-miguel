import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AccessprofileService } from './accessprofile.service';
import { AccessprofileResolver } from './accessprofile.resolver';
import { AcessProfile } from './accessprofile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AcessProfile])],
  providers: [AccessprofileService],
  exports: [AccessprofileService],
})
export class AccessprofileModule {}
