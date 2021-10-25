import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator'; //Aqui sao tipos de validacao
@InputType() //Aqui usamos para infomar ao GraphQl que isso e um input type
export class CreateGameInput {
  @Field()
  @IsString()
  @Length(3, 255)
  @IsNotEmpty({ message: 'The field is required' })
  typeGame: string;
  @Field()
  @IsString()
  @Min(3)
  @IsNotEmpty({ message: 'The field is required' })
  description: string;
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'The field is required' })
  color: string;
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'The field is required' })
  maxNumber: number;
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'The field is required' })
  range: number;
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'The field is required' })
  price: number;
}
