import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724498796044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS shipments (
       shipment_no VARCHAR(255) PRIMARY KEY,
       shipment_date DATE NOT NULL,
       shipment_status VARCHAR(255) NOT NULL CHECK (shipment_status IN ('RUNNING', 'DONE', 'CANCELLED'))
       );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE shipments;`);
  }
}
