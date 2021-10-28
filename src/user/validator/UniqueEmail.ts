import { UserService } from './../user.service';

import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
@Injectable()
@ValidatorConstraint({ name: 'uniqueEmail', async: true })
export class UniqueEmail implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UserService) {}

  async validate(text: string, args: ValidationArguments) {
    let user;
    try {
      user = await this.userService.getUserByEmail(text);
    } catch (e) {}
    return user ? false : true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Duplicate email key';
  }
}
