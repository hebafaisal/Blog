/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator'
export class CreateArticleDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
