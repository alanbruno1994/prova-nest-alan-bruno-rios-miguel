import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator'; //Aqui sao tipos de validacao

@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class UpdateBetInput {
  @Field()
  @IsString()
  @Length(2, 255)
  @IsOptional()
  numberChoose?: string;
  @Field()
  @IsNumber()
  @Min(0)
  @IsOptional()
  gameId?: number;
}
