import { Bet } from './../../bet/bet.entity';
import { Game } from './../../game/game.entity';
import { User } from '../../user/user.entity';
import { AcessProfile } from '../../accessprofile/accessprofile.entity';

export default class TestUtil {
  static accessProfilePlayer(): AcessProfile {
    let access = new AcessProfile();
    access.id = 1;
    access.level = 'player';
    return access;
  }

  static accessProfileAdmin(): AcessProfile {
    let access = new AcessProfile();
    access.id = 2;
    access.level = 'admin';
    return access;
  }

  static userOne(): User {
    let user = new User();
    user.id = 1;
    user.email = 'admin@gmail.com';
    user.password = '123';
    user.accessProfileId = this.accessProfileAdmin().id;
    return user;
  }

  static userTwo(): User {
    let user = new User();
    user.id = 1;
    user.email = 'client@gmail.com';
    user.password = '123';
    user.accessProfileId = this.accessProfilePlayer().id;
    return user;
  }

  static gameOne(): Game {
    let game: Game = {
      id: 1,
      typeGame: 'megasena',
      price: 3,
      color: 'red',
      range: 6,
      maxNumber: 60,
      description: 'game',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return game;
  }

  static gameTwo(): Game {
    let game: Game = {
      id: 1,
      typeGame: 'quina',
      price: 3,
      color: 'red',
      range: 6,
      maxNumber: 60,
      description: 'game',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return game;
  }

  static betOne(): Bet {
    let bet: Bet = {
      id: 1,
      priceGame: this.gameOne().price,
      gameId: this.gameOne().id,
      userId: this.userTwo().id,
      numberChoose: '01,03,15,13,40,32',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return bet;
  }

  static betTwo(): Bet {
    let bet: Bet = {
      id: 2,
      priceGame: this.gameTwo().price,
      gameId: this.gameTwo().id,
      userId: this.userTwo().id,
      numberChoose: '01,03,15,13,40,32',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return bet;
  }
}
