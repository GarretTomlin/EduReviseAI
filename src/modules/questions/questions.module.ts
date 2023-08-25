import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Question, User } from 'src/database/entities';
import { QueryBuilderService } from 'src/shared/query-builder.service';
import { QuestionBank } from 'src/database/entities/edurevise/question-bank.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Question, QuestionBank, User] }),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, QueryBuilderService],
})
export class QuestionsModule {}
