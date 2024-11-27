/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from '../articles/articles.service';

describe('ArticlesService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
