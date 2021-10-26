import {
  Field,
  HideField,
  ID,
  ObjectType,
  ResolveField,
} from '@nestjs/graphql';
import { hashPasswordTransform } from '../common/crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AcessProfile } from 'src/accessprofile/accessprofile.entity';

//Aqui ficaria a timpagem da entidader user que tem por sua vez uma tabela no banco de dados
@ObjectType() //Aqui esta dizendo para o GraphQl que uma tipagem
@Entity({ name: 'users' }) //Aqui esta dizendo para o TypeOrm que isso sera uma entidade
export class User {
  @PrimaryGeneratedColumn() //aqui informa ao typeorm que isso seria o id
  @Field(() => ID) //aqui para ser usado pelo GraphQl
  id: number;

  //para nao precisa colocar um campo field voce instalar o plugin(https://docs.nestjs.com/graphql/cli-plugin) no arquivo nest-cli.json
  @Field()
  @Column() //informa para o typeorm que isso e uma coluna
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ name: 'access_profile_id' })
  public accessProfileId: number;

  @Column({ transformer: hashPasswordTransform })
  @HideField() //usado para que esse campo nao retorne em uma consulta
  password: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => AcessProfile, (access) => access.userConnection, {
    primary: true,
  })
  @JoinColumn({ name: 'access_profile_id' })
  accessConnection: Promise<AcessProfile>;
}
