import { Module } from '@nestjs/common';
import { QuestionbankService } from './questionbank.service';
import { QuestionbankController } from './questionbank.controller';

@Module({
  controllers: [QuestionbankController],
  providers: [QuestionbankService],
})
export class QuestionbankModule {}
