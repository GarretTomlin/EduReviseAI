import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { QuestionBankFactory } from '../factory/question-bank.entity';

export class QuestionbankSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new QuestionBankFactory(em).make(10);
  }
}
