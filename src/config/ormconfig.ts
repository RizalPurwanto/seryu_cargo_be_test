import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();
const configService = new ConfigService();

export const dataSourceOption: DataSourceOptions = {
  name: 'db_host',
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/**/*.js'],

  migrationsTableName: 'migrations',
};

const myDataSource = new DataSource(dataSourceOption);
export default myDataSource;
