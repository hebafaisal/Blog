/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Article } from './articles/entities/article.entity';
import { Comment } from './comments/entities/comment/comment';
// const entitiesPath = __dirname + '/**/*.entity{.ts,.js}';
@Module({ 
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }), 
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Article, Comment],
      synchronize: false,
    }),
    UserModule,
    ArticlesModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}


