/* eslint-disable prettier/prettier */
// import { Article } from "src/articles/entities/article.entity";
// import { User } from "src/user/entities/user.entity";
// import { Comment } from "src/comments/entities/comment/comment";
import { DataSource } from "typeorm";

// const entitiesPath = __dirname + '/**/*.entity{.ts,.js}';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blog',
entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false, 
  logging: true, 
});
