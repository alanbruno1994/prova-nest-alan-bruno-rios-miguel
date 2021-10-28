import { UniqueEmail } from './../validator/UniqueEmail';
import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator'; //Aqui sao tipos de validacao
@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class UpdateUserInput {
  @Field()
  @IsString()
  @Length(10, 255)
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  name?: string;
  @Field()
  @IsString()
  @Length(6, 15)
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  password?: string;
  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'The field is required' })
  @Validate(UniqueEmail)
  @IsOptional()
  email?: string;
}
