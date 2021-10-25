import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'; //Aqui sao tipos de validacao

@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class UpdateBetInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  numberChoose: string;
  @Field()
  @IsNumber()
  @IsNotEmpty()
  gameId: number;
}
