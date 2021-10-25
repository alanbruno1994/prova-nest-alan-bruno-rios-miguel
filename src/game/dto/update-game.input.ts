import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator'; //Aqui sao tipos de validacao
@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class UpdateGameInput {
  @Field()
  @IsString()
  @Length(3, 255)
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  typeGame: string;
  @Field()
  @IsString()
  @Min(3)
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  description: string;
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  color: string;
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  maxNumber: number;
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  range: number;
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  price: number;
}
