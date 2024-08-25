import { createReadStream } from 'fs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { parse } from 'csv-parse';
import { Drivers } from '../../src/drivers/entities/drivers.entity';

export class Seed1724513763765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvFile = await createReadStream('data/drivers.csv')
      .pipe(parse({ columns: true }))
      .toArray();

    await queryRunner.manager.save(
      queryRunner.manager.create(Drivers, csvFile),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM drivers`);
  }
}
