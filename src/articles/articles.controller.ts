/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ArticleService } from 'src/articles/articles.service'; 
import { CreateArticleDto } from 'src/articles/dto/Create-article-dto '; 
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @Request() req) {
    const userId = req.user.id; 
    return this.articleService.createArticle(createArticleDto, userId);
  }

  @Get()
  async getAllArticles() {
    return this.articleService.findAll();
  }

  @Get(':id')
  async getArticle(@Param('id') id: number) {
    return this.articleService.findOne(id);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: number, @Request() req) {
    const userId = req.user.id;
    return this.articleService.deleteArticle(id, userId);
  }
}
