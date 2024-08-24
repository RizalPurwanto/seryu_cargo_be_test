import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724498796044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS shipment_costs (
       id SERIAL PRIMARY KEY,
       driver_code VARCHAR(255) REFERENCES drivers(driver_code),
       shipment_no VARCHAR(255) REFERENCES shipments(shipment_no),
       total_costs DECIMAL(10, 2) NOT NULL,
       cost_status VARCHAR(255) NOT null CHECK (cost_status IN ('PENDING', 'CONFIRMED', 'PAID')),
       constraint unique_shipment_costs unique (driver_code,shipment_no)
       );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE shipment_costs;`);
  }
}
