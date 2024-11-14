/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/Create-article-dto ';
import { User } from 'src/user/entities/user.entity';

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
    throw new Error(`User with ID ${userId} not found`);
  }

  const article = this.articleRepository.create({ ...createArticleDto, user });
  return this.articleRepository.save(article);
}

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOne(id: number): Promise<Article> {
  return this.articleRepository.findOne({
    where: { id }, 
    relations: ['user', 'comments'], 
  });
}
    
  async deleteArticle(id: number, userId: number): Promise<void> {
    const article = await this.articleRepository.findOne({ where: { id } });

    if (article && article.user.id === userId) {
      await this.articleRepository.delete(id);
    } else {
      throw new Error('Article not found');
    }
  }
}
