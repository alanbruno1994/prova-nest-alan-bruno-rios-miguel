import { GameExist } from './../validator/GameExist';
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator'; //Aqui sao tipos de validacao
import { Type } from 'class-transformer';

@ObjectType()
@InputType()
class Bets {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  numberChoose: string;
  @Field()
  @IsNumber()
  @Min(1)
  @Validate(GameExist)
  gameId: number;
}

@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class CreateBetInput {
  @Type(() => Bets)
  @ValidateNested({ each: true })
  bets: Bets[];
}
