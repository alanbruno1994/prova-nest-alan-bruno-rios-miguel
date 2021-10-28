import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessprofileModule } from './accessprofile/accessprofile.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BetModule } from './bet/bet.module';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import config from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
    }),
    UserModule,
    GameModule,
    AccessprofileModule,
    BetModule,
    AuthModule,
    TypeOrmModule.forRoot({
      ...config,
      type: 'mysql',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false, //isso e perigoso e modo de producao! Se true, os modelos serao carregados automaticamente. Ou seja, se criar uma model por exemplo, ele poderia automaticamente colocar no banco de dados
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
