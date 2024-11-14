/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ArticleController } from './articles.controller';
import { ArticleService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, User]),  
  ],
  providers:  [ArticleService],
  controllers: [ArticleController],
})
export class ArticlesModule {}
