import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createdGame1634945161447 implements MigrationInterface {
  private table = new Table({
    name: 'games',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'type_game',
        type: 'varchar',
        length: '120',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'description',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'range',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'price',
        type: 'float',
        isNullable: false,
      },
      {
        name: 'max_number',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'color',
        type: 'varchar',
        length: '120',
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

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }
}
