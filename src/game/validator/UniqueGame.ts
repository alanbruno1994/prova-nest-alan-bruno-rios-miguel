import { GameService } from './../game.service';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
@Injectable()
@ValidatorConstraint({ name: 'customText', async: true })
export class UniqueGame implements ValidatorConstraintInterface {
  constructor(protected readonly gameService: GameService) {}

  async validate(text: string, args: ValidationArguments) {
    let game;
    try {
      game = await this.gameService.findByTypeGame(text);
    } catch (e) {}
    return game ? false : true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Duplicate typeGame key';
  }
}
