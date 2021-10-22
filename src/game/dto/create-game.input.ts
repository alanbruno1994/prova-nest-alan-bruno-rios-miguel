import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator'; //Aqui sao tipos de validacao
@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class CreateGameInput {
  @IsString()
  @Length(3, 255)
  @IsNotEmpty({ message: 'The field is required' })
  typeGame: string;
  @IsString()
  @Min(3)
  @IsNotEmpty({ message: 'The field is required' })
  description: string;
  @IsString()
  @IsNotEmpty({ message: 'The field is required' })
  color: string;
  @IsNumber()
  @IsNotEmpty({ message: 'The field is required' })
  maxNumber: number;
  @IsNumber()
  @IsNotEmpty({ message: 'The field is required' })
  range: number;
  @IsNumber()
  @IsNotEmpty({ message: 'The field is required' })
  price: number;
}
