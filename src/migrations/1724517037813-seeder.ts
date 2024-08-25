import { createReadStream } from 'fs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { parse } from 'csv-parse';
import { DriverAttendances } from '../../src/driver_attendances/entities/driver_attendances.entity';

export class Seed1724517037813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvFile = await createReadStream('data/driver_attendances.csv')
      .pipe(
        parse({
          columns: true,
          cast: (value, context) => {
            if (context.header) {
              return value;
            }

            if (value === 'true') return true;
            if (value === 'false') return false;

            return value;
          },
        }),
      )
      .toArray();

    await queryRunner.manager.save(
      queryRunner.manager.create(DriverAttendances, csvFile),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM driver_attendances`);
  }
}
