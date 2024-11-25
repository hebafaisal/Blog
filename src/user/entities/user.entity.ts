/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Article } from '../../articles/entities/article.entity'; 
import { Comment } from '../../comments/entities/comment/comment'; 

@Entity('user')
export class User {
    @PrimaryGeneratedColumn("uuid")
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

  //represents who follows the current user
    @ManyToMany(() => User, (user) => user.following)
    @JoinTable({
    name: 'followers',
    joinColumn: {
      name: 'follower_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'followee_id',
      referencedColumnName: 'id',
    },
  })
  followers: User[];

  // Represents who the current user is following
  @ManyToMany(() => User, (user) => user.followers)
  following: User[];

}