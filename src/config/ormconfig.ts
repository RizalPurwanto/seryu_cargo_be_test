import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOption: DataSourceOptions = {
  name: 'db_host',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'seryu_db',
  logging: true,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],

  migrationsTableName: 'migrations',
};

const myDataSource = new DataSource(dataSourceOption);
export default myDataSource;
