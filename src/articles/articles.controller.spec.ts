/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './articles.controller';

describe('ArticlesController', () => {
  let controller: ArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
