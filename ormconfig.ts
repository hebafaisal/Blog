/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  migrations: ['./src/migrations/*.ts'],
  synchronize: true,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();

export default dataSource;