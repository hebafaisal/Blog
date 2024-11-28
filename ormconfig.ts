/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV;
const typeORMConfig:DataSourceOptions = env === 'test' ? {
  type: "postgres",
  host: process.env.TEST_DB_HOST,
  port: +process.env.TEST_DB_PORT,
  username: process.env.TEST_DB_USER,
  password: process.env.TEST_DB_PASSWORD,
  database: process.env.TEST_DB_NAME,
  // autoLoadentities: false,
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  migrations: ['src/migration/*{.ts,.js}'],
  synchronize: true,
  logging: false,
  migrationsRun: true,
  dropSchema: true,
} : {
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER || 'hebaa',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + 'src/entities/*.entity{.ts,.js}'],
  migrations: ['src/migration/*{.ts,.js}'],
  // synchronize: true,
  logging: false,
  migrationsRun: true,
  // dropSchema: true,
  
};

export const dataSourceOptions: DataSourceOptions = typeORMConfig;

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();

export default dataSource;