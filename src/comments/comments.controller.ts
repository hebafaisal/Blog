/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Patch, Req} from '@nestjs/common';
import { CommentService } from './comments.service'; 
import { CreateCommentDto } from './dto/Create-comment-dto';
import { UpdateCommentDto } from './dto/Update-comment-dto';
// import { JwtGuard } from 'src/auth/JwtAuthGuard/jwt.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }
  
  @Post('/new-comment')
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: any) {
    const user = req.user;
    const { articleId } = createCommentDto; 
    return this.commentService.createComment(createCommentDto, user, articleId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto, @Req() req: any) {
    const user = req.user;
    return this.commentService.update(id, updateCommentDto, user);
  }

//   @Delete(':id')
//   async delete(@Param('id') id: number,
//   @Req() req: any) {
//   const user = req.user;
//   return this.commentService.delete(id, user);
  // }
  
}

