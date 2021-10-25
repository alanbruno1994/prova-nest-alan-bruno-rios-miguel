import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//Aqui ficaria a timpagem da entidader user que tem por sua vez uma tabela no banco de dados
@ObjectType() //Aqui esta dizendo para o GraphQl que uma tipagem
@Entity({ name: 'games' }) //Aqui esta dizendo para o TypeOrm que isso sera uma entidade
export class Game {
  @PrimaryGeneratedColumn() //aqui informa ao typeorm que isso seria o id
  @Field(() => ID) //aqui para ser usado pelo GraphQl
  id: number;

  @Field()
  @Column({ name: 'type_game' })
  typeGame: string;

  @Field()
  @Column()
  public description: string;

  @Field()
  @Column()
  public range: number;

  @Field()
  @Column()
  public price: number;

  @Field()
  @Column({ name: 'max_number' })
  public maxNumber: number;

  @Field()
  @Column()
  public color: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
