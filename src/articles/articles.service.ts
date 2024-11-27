/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../articles/entities/article.entity';
import { CreateArticleDto } from '../articles/dto/Create-article-dto ';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createArticle(createArticleDto: CreateArticleDto, userId: number): Promise<Article> {
  const user = await this.userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error(`User ID: ${userId} not found`);
  }

  const article = this.articleRepository.create({ ...createArticleDto, user });
  return this.articleRepository.save(article);
}

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOne(id: number): Promise<Article> {
  const article = await this.articleRepository.findOne({
    where: { id }, 
    relations: ['user', 'comments'], 
  });
    
  if (!article) {
    throw new Error(`Article with ID ${id} not found`);
    }
    
  return article;  
}
    
  async deleteArticle(id: number, userId: number): Promise<void> {
    const article = await this.articleRepository.findOne({ where: { id } });

    if (article && article.user.id === userId) {
      await this.articleRepository.delete(id);
    }
    if (article.user.id !== userId) {
      throw new UnauthorizedException(`You cannot delete this article`);
    }
    if (!article) {
      throw new Error('Article not found');
    }
  }
  
}
