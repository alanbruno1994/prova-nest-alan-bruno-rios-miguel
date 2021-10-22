import { InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator'; //Aqui sao tipos de validacao
@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class CreateUserInput {
  @IsString()
  @Length(10, 255)
  @IsNotEmpty({ message: 'The field is required' })
  name: string;
  @IsString()
  @Length(6, 15)
  @IsNotEmpty({ message: 'The field is required' })
  password: string;
  @IsEmail()
  @IsNotEmpty({ message: 'The field is required' })
  email: string;
  @IsNumber()
  @IsNotEmpty({ message: 'The field is required' })
  accessProfileId: number;
}
