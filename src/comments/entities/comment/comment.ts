/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('comment')
export class Comment {
 @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}