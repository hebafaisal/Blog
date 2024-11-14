/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment/comment';
import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateCommentDto } from './dto/Create-comment-dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async createComment(createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
    const { content, articleId } = createCommentDto;
    
    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!article) {
      throw new Error(`Article with ID ${articleId} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const comment = this.commentRepository.create({ content, article, user });
    return this.commentRepository.save(comment);
  }

  async getCommentsForArticle(articleId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { article: { id: articleId } },
      relations: ['user'],
    });
  }
}

