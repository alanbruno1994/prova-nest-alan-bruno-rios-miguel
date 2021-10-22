import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator'; //Aqui sao tipos de validacao
@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class CreateAccessProfileInput {
  @IsString()
  @Length(3, 255)
  @IsNotEmpty({ message: 'The field is required' })
  level: string;
}
