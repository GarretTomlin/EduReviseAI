import { Test, TestingModule } from '@nestjs/testing';
import { QuestionbankService } from '../../../src/modules/questionbank/questionbank.service';
import { beforeEach, describe, it, expect } from 'bun:test';

describe('QuestionbankService', () => {
  let service: QuestionbankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionbankService],
    }).compile();

    service = module.get<QuestionbankService>(QuestionbankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
