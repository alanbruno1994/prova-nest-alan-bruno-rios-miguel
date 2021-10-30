import { GameService } from '../../game/game.service';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'gameExist', async: true })
export class GameExist implements ValidatorConstraintInterface {
  constructor(protected readonly gameService: GameService) {}

  async validate(id: number, args: ValidationArguments) {
    let game;
    try {
      game = await this.gameService.findById(id);
    } catch (e) {}
    return game ? true : false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Not found a game';
  }
}