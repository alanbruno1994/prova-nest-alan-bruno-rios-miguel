import { User } from 'src/user/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//Aqui ficaria a timpagem da entidader user que tem por sua vez uma tabela no banco de dados
@ObjectType() //Aqui esta dizendo para o GraphQl que uma tipagem
@Entity({ name: 'access_profiles' }) //Aqui esta dizendo para o TypeOrm que isso sera uma entidade
export class AcessProfile {
  @PrimaryGeneratedColumn() //aqui informa ao typeorm que isso seria o id
  @Field(() => ID) //aqui para ser usado pelo GraphQl
  id: number;

  @Field()
  @Column()
  public level: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associations
  @OneToMany(() => User, (user) => user.accessConnection)
  userConnection: Promise<User[]>;
}
