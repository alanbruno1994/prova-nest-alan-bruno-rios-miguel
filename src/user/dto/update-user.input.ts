import { InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'; //Aqui sao tipos de validacao
@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class UpdateUserInput {
  @IsString()
  @Length(10, 255)
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  name: string;
  @IsString()
  @Length(6, 15)
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  password: string;
  @IsEmail()
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  email: string;
  @IsNumber()
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  accessProfileId: number;
}
