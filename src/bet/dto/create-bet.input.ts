import { InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator'; //Aqui sao tipos de validacao

export class Bets {
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  numberChoose: string;

  @IsNumber()
  @IsNotEmpty()
  gameId: number;
}

@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class CreateBetInput {
  @IsArray()
  @ValidateNested({ each: true })
  bets: Bets[];
}
