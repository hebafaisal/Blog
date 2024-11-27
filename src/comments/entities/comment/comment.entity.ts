/* eslint-disable prettier/prettier */
// import { Article } from 'src/articles/entities/article.entity';
import { Article } from '../../../articles/entities/article.entity';
import { User } from '../../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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