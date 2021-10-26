import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator'; //Aqui sao tipos de validacao

@InputType()
export class Bets {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  numberChoose: string;
  @Field()
  gameId: number;
}

@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class CreateBetInput {
  @ValidateNested({ each: true })
  bets: Bets[];
}
