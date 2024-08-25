import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
// import path from 'path';
// const path = require('path');
config();
const configService = new ConfigService();

const pathArr = __dirname.split('/');
pathArr.pop();
const path = pathArr.join('/');

export const dataSourceOption: DataSourceOptions = {
  name: 'db_host',
  type: 'postgres',

  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  logging: true,
  // entities: ['src/**/**.entity{.ts,.js}', 'dist/**/*.entity.js'],
  // migrations: ['src/migrations/**/*{.ts,.js}', 'dist/migration/**/*.js'],
  entities: [`${path}/**/**.entity{.ts,.js}`],
  migrations: [`${path}/migrations/**/*{.ts,.js}`],
  // entities: ['dist/**/**.entity.js'],
  // migrations: ['dist/migrations/**/*.js'],
  // entities: [path.join(__dirname, '**', '*.entity{.ts,.js}')],
  // migrations: [path.join(__dirname, 'src', 'migrations', '*{.ts,.js}')],

  migrationsTableName: 'migrations',
};

const myDataSource = new DataSource(dataSourceOption);
export default myDataSource;
