/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { Comment } from 'src/comments/entities/comment/comment'; 

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    
    @OneToMany(() => Article, (article) => article.user)
    articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

}