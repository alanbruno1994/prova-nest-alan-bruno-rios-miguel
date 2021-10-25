import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'; //Aqui sao tipos de validacao

@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class UpdateAccessProfileInput {
  @Field()
  @IsString()
  @Length(3, 255)
  @IsNotEmpty({ message: 'The field is required' })
  @IsOptional()
  level: string;
}
