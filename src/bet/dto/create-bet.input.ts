import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
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
  @IsNumber()
  @Min(1)
  gameId: number;
}

@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class CreateBetInput {
  @IsArray()
  @ValidateNested({ each: true })
  bets: Bets[];
}
