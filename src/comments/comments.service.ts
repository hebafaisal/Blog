/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment/comment';
import { CreateCommentDto } from './dto/Create-comment-dto';
import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdateCommentDto } from './dto/Update-comment-dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}
  
  async createComment(createCommentDto: CreateCommentDto, user: User, articleId: number): Promise<Comment> {
    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!articleId) {
      throw new Error('The article no longer exists.');
    }
    const comment = await this.commentRepository.create({
      content: createCommentDto.content,
      user: user,
      article: article,
    });
    return this.commentRepository.save(comment);
  }

   async update(id: number, updateCommentDto: UpdateCommentDto, user: User) {
    const existingComment = await this.commentRepository.findOne({
        where: { id },
        relations: ['user'], 
    });
     
    if (existingComment.user.id !== user.id) {
        throw new Error("You don't have permission to update this comment");
    }

    if (!existingComment) {
        throw new Error(`Comment ID: ${id} not found`);
     }
    
    existingComment.content = updateCommentDto.content;
    await this.commentRepository.save(existingComment);
    return existingComment; 
  }

  async delete(id: number, user: User) {
    const existingComment = await this.commentRepository.findOne({
        where: { id },
        relations: ['user'], 
    });
     
    if (existingComment.user.id !== user.id) {
        throw new Error("You don't have permission to update this comment");
    }

    if (!existingComment) {
        throw new Error(`Comment ID: ${id} not found`);
     }
    
    await this.commentRepository.delete(id);
    return `This comment has been deleted successfully`;
  }

}

