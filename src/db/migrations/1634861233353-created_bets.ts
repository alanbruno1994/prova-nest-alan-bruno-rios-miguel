import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createdBets1634861233353 implements MigrationInterface {
  private table = new Table({
    name: 'bets',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'user_id',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'game_id',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'number_choose',
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

  private foreignKeyOne = new TableForeignKey({
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    referencedTableName: 'users',
  });

  private foreignKeyTwo = new TableForeignKey({
    columnNames: ['game_id'],
    referencedColumnNames: ['id'],
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    referencedTableName: 'games',
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('bets', this.foreignKeyOne);
    await queryRunner.createForeignKey('bets', this.foreignKeyTwo);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }
}
