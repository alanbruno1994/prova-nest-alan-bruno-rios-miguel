import { UniqueEmail } from './../validator/UniqueEmail';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator'; //Aqui sao tipos de validacao

@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class CreateUserInput {
  @Field()
  @IsString()
  @Length(10, 255)
  @IsNotEmpty({ message: 'The field is required' })
  name: string;
  @Field()
  @IsString()
  @Length(6, 15)
  @IsNotEmpty({ message: 'The field is required' })
  password: string;
  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'The field is required' })
  @Validate(UniqueEmail)
  email: string;
}
