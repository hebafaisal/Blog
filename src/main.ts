/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as dotenv from 'dotenv';
// dotenv.config({ path: './.env' });
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_NAME:', process.env.DB_NAME);;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

}
bootstrap();
