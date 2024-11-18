/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator'
import { CreateArticleDto } from './Create-article-dto ';

export class UpdateArticalDto extends PartialType(CreateArticleDto) {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    body: string;
}