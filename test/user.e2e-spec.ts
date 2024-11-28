/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Users E2E Tests', () => {
  let app: INestApplication;
  let token: string; 
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Guest user can register in the platform', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send({ username: 'guest', email: 'guest@example.com', password: 'password123' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('guest@example.com');
  });

  it('Guest user can hit the login endpoint (valid credentials)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'guest@example.com', password: 'password123' })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('Guest user cannot log in with invalid credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'guest@example.com', password: 'wrongpassword' })
      .expect(401);
  });

  it('Guest user can explore all the articles', async () => {
    const response = await request(app.getHttpServer()).get('/articles').expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Guest user cannot create an article', async () => {
    await request(app.getHttpServer())
      .post('/articles')
      .send({ title: 'New Article', body: 'This is a test article.' })
      .expect(401);
  });

  it('Logged-in user can create an article', async () => {
    const response = await request(app.getHttpServer())
      .post('/articles')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New Article', body: 'This is a test article.' })
      .expect(201);

    expect(response.body.title).toBe('New Article');
  });

  it('Logged-in user cannot create an article without a body', async () => {
    await request(app.getHttpServer())
      .post('/articles')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Incomplete Article' })
      .expect(400);
  });

  it('Follow-User functionality works as expected', async () => {
    const newUser = await request(app.getHttpServer())
      .post('/users/register')
      .send({ username: 'otherUser', email: 'other@example.com', password: 'password123' })
      .expect(201);

    await request(app.getHttpServer())
      .post(`/users/${newUser.body.id}/follow`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const followers = await request(app.getHttpServer())
      .get(`/users/${newUser.body.id}/followers`)
      .expect(200);

    expect(followers.body).toHaveLength(1);
    expect(followers.body[0].id).toBeDefined();
  });

  it('Authorization Test: Edit article as author and non-author', async () => {
    const article = await request(app.getHttpServer())
      .post('/articles')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Author Article', body: 'Created by author.' })
      .expect(201);

    const newUserToken = (
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'other@example.com', password: 'password123' })
        .expect(200)
    ).body.token;

    await request(app.getHttpServer())
      .put(`/articles/${article.body.id}`)
      .set('Authorization', `Bearer ${newUserToken}`)
      .send({ title: 'Edited by unauthorized user' })
      .expect(401);

    await request(app.getHttpServer())
      .put(`/articles/${article.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ Title: 'Edited by author', Body: 'Updated content.' })
      .expect(200);
  });
});
