import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724498796044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS drivers (
       id SERIAL PRIMARY KEY,
       driver_code VARCHAR(255) UNIQUE NOT NULL,
       name VARCHAR(255) NOT NULL
       );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE drivers;`);
  }
}
