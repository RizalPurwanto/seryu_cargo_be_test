import { createReadStream } from 'fs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { parse } from 'csv-parse';
import { Shipments } from '../../src/shipments/entities/shipments.entity';

export class Seed1724519173694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvFile = await createReadStream('data/shipments.csv')
      .pipe(parse({ columns: true }))
      .toArray();

    await queryRunner.manager.save(
      queryRunner.manager.create(Shipments, csvFile),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM shipments`);
  }
}
