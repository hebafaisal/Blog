/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comments/entities/comment/comment.entity'; 

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];
}





