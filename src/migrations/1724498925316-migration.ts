import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724498796044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS driver_attendances (
       id SERIAL PRIMARY KEY,
       driver_code VARCHAR(255) REFERENCES drivers(driver_code),
       attendance_date DATE NOT NULL,
       attendance_status BOOLEAN NOT null,
       CONSTRAINT unique_attendance UNIQUE (driver_code, attendance_date)
       );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE driver_attendances;`);
  }
}
