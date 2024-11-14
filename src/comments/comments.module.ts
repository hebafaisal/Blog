/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from './entities/comment/comment';

@Module({
   imports: [
    TypeOrmModule.forFeature([Comment, Article, User]), 
  ],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentsModule {}
