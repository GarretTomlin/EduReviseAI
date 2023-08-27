import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { QueryBuilderService } from '../../shared/utils/query-builder.service';
import { QuestionBank } from '../../database/entities/edurevise/question-bank.entity';
import { Question } from '../../database/entities/edurevise/question.entity';
import { User } from '../../database/entities/edurevise/user.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Question, QuestionBank, User] }),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, QueryBuilderService],
})
export class QuestionsModule {}
