import { GameService } from '../../game/game.service';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions
} from 'class-validator';



export function BetValidator(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: BetValidatorService,
        });
    };
}

@Injectable()
@ValidatorConstraint({name: 'BetValiator', async: true })
export class BetValidatorService implements ValidatorConstraintInterface {
  constructor(protected readonly gameService: GameService) {}
  private messsage='Not found a game'

   async validate(id: number, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];   
        let game;
        try {
          game = await this.gameService.findById(id);
          if(!this.validateNumber(game.range,relatedValue))
          {
            this.messsage='Unformatted number correctly formatted'
            return false
          }
          return true;
        } catch (e) {
          return false
        } 
      
      }

    defaultMessage(args: ValidationArguments) {
      return  this.messsage;
    }

    validateNumber(qtd: number, numberChoose: string) {
      return numberChoose.match(/\d+/g).length === qtd;
    }

}