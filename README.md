## Database Schema

Below is the database schema used in the project:
![Screenshot 2024-11-19 184409](https://github.com/user-attachments/assets/7ae3f70b-7e0e-4d81-9aab-c1b43abdc868)

The link: https://dbdiagram.io/d/673cb265e9daa85acafe91b9

## Indexing
Before using indexing:
![Screenshot 2024-11-21 181419before](https://github.com/user-attachments/assets/6c06df80-f4da-40ce-9463-67f0b93c9310)

After using indexing:
![Screenshot 2024-11-21 183257after](https://github.com/user-attachments/assets/677d5c41-1756-45ee-a43a-ffe2a8dcc90f)

## Test coverage 
-------------------------------|---------|----------|---------|---------|-------------------
File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------------|---------|----------|---------|---------|-------------------
All files                      |   37.34 |     7.89 |   17.91 |   36.05 |                   
 src                           |   33.33 |        0 |      60 |   27.27 |                   
  app.controller.ts            |     100 |      100 |     100 |     100 |                   
  app.module.ts                |       0 |      100 |       0 |       0 | 2-41              
  app.service.ts               |     100 |      100 |     100 |     100 |                   
  main.ts                      |       0 |        0 |       0 |       0 | 2-14
 src/articles                  |   14.81 |        0 |       0 |    12.5 | 
  articles.controller.ts       |       0 |      100 |       0 |       0 | 2-33
  articles.module.ts           |       0 |      100 |     100 |       0 | 2-17
  articles.service.ts          |   29.62 |        0 |       0 |      24 | 13-56
 src/articles/dto              |       0 |      100 |     100 |       0 | 
  Create-article-dto .ts       |       0 |      100 |     100 |       0 | 2-11
  Update-artical.dto.ts        |       0 |      100 |     100 |       0 | 2-14
 src/articles/entities         |      75 |      100 |       0 |   83.33 | 
  article.entity.ts            |      75 |      100 |       0 |   83.33 | 20,23
 src/auth                      |   34.88 |        0 |       0 |   31.42 | 
  auth.controller.ts           |   66.66 |        0 |       0 |      60 | 10,15-18
  auth.module.ts               |       0 |      100 |     100 |       0 | 2-18
  auth.service.ts              |   38.88 |        0 |       0 |   31.25 | 12-33
  jwt-auth.guard.ts            |       0 |      100 |     100 |       0 | 2-6
 src/auth/strategy             |       0 |        0 |       0 |       0 |                   
  jwt.strategy.ts              |       0 |        0 |       0 |       0 | 2-17
  local.strategy.ts            |       0 |        0 |       0 |       0 | 2-20
 src/comments                  |   31.03 |        0 |       0 |   26.92 | 
  comments.controller.ts       |      60 |      100 |       0 |   53.84 | 10,14-16,21-22   
  comments.module.ts           |       0 |      100 |     100 |       0 | 2-15
  comments.service.ts          |   28.12 |        0 |       0 |   23.33 | 15-67
 src/comments/dto              |     100 |      100 |     100 |     100 | 
  Create-comment-dto.ts        |     100 |      100 |     100 |     100 | 
  Update-comment-dto.ts        |     100 |      100 |     100 |     100 | 
 src/comments/entities/comment |   71.42 |      100 |       0 |      80 | 
  comment.ts                   |   71.42 |      100 |       0 |      80 | 14,17
 src/user                      |   43.51 |    16.66 |      45 |      43 | 
  user.controller.ts           |     100 |      100 |     100 |     100 | 
  user.module.ts               |       0 |      100 |     100 |       0 | 2-15
  user.service.ts              |   14.75 |        0 |       0 |   12.28 | 14-124
 src/user/dto                  |   41.66 |      100 |     100 |   41.66 | 
  Create-user-dto.ts           |     100 |      100 |     100 |     100 | 
  update-user.dto.ts           |       0 |      100 |     100 |       0 | 2-17
 src/user/entities             |   63.63 |      100 |       0 |      75 | 
  user.entity.ts               |   63.63 |      100 |       0 |      75 | 20,23,27,42      
-------------------------------|---------|----------|---------|---------|-------------------
Test Suites: 7 failed, 2 passed, 9 total
Tests:       6 failed, 13 passed, 19 total
Snapshots:   0 total
Time:        31.328 s



