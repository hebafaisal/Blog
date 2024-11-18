/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ArticleController } from './articles.controller';
import { ArticleService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]), UserModule,  
  ],
  controllers: [ArticleController],
  providers:  [ArticleService],
  exports: [TypeOrmModule],
})
export class ArticlesModule {}
