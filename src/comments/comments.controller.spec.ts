/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from '../comments/comments.controller';

describe('CommentsController', () => {
  let controller: CommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
