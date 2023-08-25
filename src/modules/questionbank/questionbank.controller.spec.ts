import { Test, TestingModule } from '@nestjs/testing';
import { QuestionbankController } from './questionbank.controller';
import { QuestionbankService } from './questionbank.service';

describe('QuestionbankController', () => {
  let controller: QuestionbankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionbankController],
      providers: [QuestionbankService],
    }).compile();

    controller = module.get<QuestionbankController>(QuestionbankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
