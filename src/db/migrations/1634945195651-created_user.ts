import { hashPasswordTransform } from '../../common/crypto';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createdUser1634945195651 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'access_profile_id',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  private foreignKey = new TableForeignKey({
    columnNames: ['access_profile_id'],
    referencedColumnNames: ['id'],
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    referencedTableName: 'access_profiles',
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('users', this.foreignKey);
    let senha = hashPasswordTransform.to('123');
    await queryRunner.query(
      `INSERT INTO users (name,email,password,access_profile_id) VALUES ('bruno','admin123@gmail.com','` +
        senha +
        `',2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }
}
