/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ArticlesModule,
    AuthModule,
    CommentsModule,

    TypeOrmModule.forRoot(
      env === 'test' ? {
        type: "postgres",
        host: process.env.TEST_DB_HOST,
        port: +process.env.TEST_DB_PORT,
        username: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        // autoLoadentities: false,
        entities: [__dirname + '/entities/*.entity{.ts,.js}'],
        synchronize: false,
        logging: false,
        migrationsRun:true,
      } : {
         type: "postgres",
         host: process.env.DB_HOST,
         port: +process.env.DB_PORT,
         username: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_NAME,
        //  autoLoadentities: false,
         entities: [__dirname + '/entities/*.entity{.ts,.js}'],
         synchronize: false,
         logging: false,
         migrationsRun:true,
      }   
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

