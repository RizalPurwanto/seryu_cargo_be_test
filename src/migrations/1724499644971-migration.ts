import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724498796044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS variable_configs (
       key VARCHAR(255) PRIMARY KEY,
       value INTEGER
       );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE variable_configs;`);
  }
}
