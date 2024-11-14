/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Get, UseGuards ,Request} from '@nestjs/common';
import { CommentService } from './comments.service'; 
import { CreateCommentDto } from './dto/Create-comment-dto';
import { JwtGuard } from 'src/auth/JwtAuthGuard/jwt.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createComment(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    const userId = req.user.id;
    return this.commentService.createComment(createCommentDto, userId);
  }

  @Get('article/:id')
  async getCommentsForArticle(@Param('id') articleId: number) {
    return this.commentService.getCommentsForArticle(articleId);
  }
}

