import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from '../../../src/modules/questions/questions.service';
import { QuestionsModule } from '../../../src/modules/questions/questions.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Question, User, QuestionBank } from '../../../src/database/entities';
import { beforeEach, describe, it, expect } from 'bun:test';

describe('QuestionsService', () => {
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        QuestionsModule,
        MikroOrmModule.forRoot(),
        MikroOrmModule.forFeature({ entities: [Question, User, QuestionBank] }),
      ],
      providers: [QuestionsService],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
