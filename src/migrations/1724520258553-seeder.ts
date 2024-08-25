import { createReadStream } from 'fs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { parse } from 'csv-parse';
import { ShipmentCosts } from '../../src/shipment_costs/entities/shipment_costs.entity';

export class Seed1724520258553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvFile = await createReadStream('data/shipment_costs.csv')
      .pipe(parse({ columns: true }))
      .toArray();

    await queryRunner.manager.save(
      queryRunner.manager.create(ShipmentCosts, csvFile),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM shipment_costs`);
  }
}
