import { UniqueGame } from '../validator/UniqueGame';

import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  validate,
  Validate,
  validateSync,
} from 'class-validator'; //Aqui sao tipos de validacao

@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class CreateGameInput {
  @Field()
  @IsString()
  @Length(3, 255)
  @IsNotEmpty({ message: 'The typeGame field is required' })
  @Validate(UniqueGame)
  typeGame: string;
  @Field()
  @IsString()
  @Length(3, 255)
  @IsNotEmpty({ message: 'The description field is required' })
  description: string;
  @Field()
  @IsString()
  @Length(3, 255)
  @IsNotEmpty({ message: 'The color field  is required' })
  color: string;
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'The maxNumber field is required' })
  maxNumber: number;
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'The range field is required' })
  range: number;
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'The price field is required' })
  price: number;
}
