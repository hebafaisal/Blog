/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ArticlesModule } from '../articles/articles.module';
import { Article } from '../articles/entities/article.entity';
import { Comment } from './entities/comment/comment.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Comment, Article]), UserModule, ArticlesModule], 
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentsModule {}
