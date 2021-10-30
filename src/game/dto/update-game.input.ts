import { UniqueGame } from './../validator/UniqueGame';
import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator'; //Aqui sao tipos de validacao
@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class UpdateGameInput {
  @Field()
  @IsString()
  @Length(3, 255)
  @IsNotEmpty({ message: 'The typeGame field is required' })
  @IsOptional()
  @Validate(UniqueGame)
  typeGame?: string;
  @Field()
  @IsString()
  @Length(3, 255)
  @IsNotEmpty({ message: 'The description field is required' })
  @IsOptional()
  description?: string;
  @Field()
  @IsString()
  @Length(3, 255)
  @IsNotEmpty({ message: 'The color field is required' })
  @IsOptional()
  color?: string;
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'The maxNumber field is required' })
  @IsOptional()
  maxNumber?: number;
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'The range field is required' })
  @IsOptional()
  range?: number;
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'The price field is required' })
  @IsOptional()
  price?: number;
}
