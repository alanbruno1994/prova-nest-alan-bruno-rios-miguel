import { Game } from './../game/game.entity';
import { User } from './../user/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//Aqui ficaria a timpagem da entidader user que tem por sua vez uma tabela no banco de dados
@ObjectType() //Aqui esta dizendo para o GraphQl que uma tipagem
@Entity({ name: 'bets' }) //Aqui esta dizendo para o TypeOrm que isso sera uma entidade
export class Bet {
  @PrimaryGeneratedColumn() //aqui informa ao typeorm que isso seria o id
  @Field(() => ID) //aqui para ser usado pelo GraphQl
  id: number;

  //para nao precisa colocar um campo field voce instalar o plugin(https://docs.nestjs.com/graphql/cli-plugin) no arquivo nest-cli.json
  @Field()
  @Column({ name: 'number_choose' })
  numberChoose: string;

  @Field()
  @Column({ name: 'user_id' })
  public userId: number;

  @Field()
  @Column({ name: 'game_id' })
  public gameId: number;

  @Field()
  @Column({ name: 'price_game' })
  public priceGame: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user?: Promise<User>;

  @OneToOne(() => Game)
  @JoinColumn({ name: 'game_id' })
  game?: Promise<Game>;
}
