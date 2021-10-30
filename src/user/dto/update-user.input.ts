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
import { MatchPassword } from '../validator/MatchPassword';
@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class UpdateUserInput {
  @Field()
  @IsString()
  @Length(10, 255)
  @IsNotEmpty({ message: 'The name field is required' })
  @IsOptional()
  name?: string;
  @Field()
  @IsString()
  @Length(6, 15)
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  @MatchPassword('passwordConfirmation',{message:'Password did not match'})
  password?: string;
  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'The field is required' })
  @Validate(UniqueEmail)
  @IsOptional()
  email?: string;
  @Field()
  @IsString()
  @Length(6, 15)
  @IsOptional()
  @IsNotEmpty({ message: 'The field is required' })  
  passwordConfirmation?: string;
}
