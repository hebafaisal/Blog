/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  articleId: number;
}
