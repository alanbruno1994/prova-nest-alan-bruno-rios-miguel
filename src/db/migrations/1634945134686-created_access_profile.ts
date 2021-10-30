import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createdAccessProfile1634945134686 implements MigrationInterface {
  private table = new Table({
    name: 'access_profiles',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'level',
        type: 'varchar',
        length: '255',
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
    await queryRunner.query(
      `INSERT INTO access_profiles (level) VALUES ('player')`,
    );
    await queryRunner.query(
      `INSERT INTO access_profiles (level) VALUES ('admin')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }
}
