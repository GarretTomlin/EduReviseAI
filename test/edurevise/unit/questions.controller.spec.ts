import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from '../../../src/modules/questions/questions.controller';
import { QuestionsService } from '../../../src/modules/questions/questions.service';
import { QuestionsModule } from '../../../src/modules/questions/questions.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Question, User, QuestionBank } from '../../../src/database/entities';
import { beforeEach, describe, it, expect } from 'bun:test';

describe('QuestionsController', () => {
  let controller: QuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        QuestionsModule,
        MikroOrmModule.forRoot(),
        MikroOrmModule.forFeature({ entities: [Question, User, QuestionBank] }),
      ],
      controllers: [QuestionsController],
      providers: [QuestionsService],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
