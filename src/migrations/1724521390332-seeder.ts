import { createReadStream } from 'fs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { parse } from 'csv-parse';
import { VariableConfigs } from '../variable_configs/entities/variable_configs.entity';

export class Seed1724521390332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvFile = await createReadStream('data/variable_configs.csv')
      .pipe(parse({ columns: true }))
      .toArray();

    await queryRunner.manager.save(
      queryRunner.manager.create(VariableConfigs, csvFile),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM variable_configs`);
  }
}
