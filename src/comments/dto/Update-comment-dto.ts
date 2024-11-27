/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { CreateCommentDto } from "../dto/Create-comment-dto";
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  articleId: number;
}