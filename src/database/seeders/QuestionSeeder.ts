import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { QuestionFactory } from '../factory/question.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new QuestionFactory(em).make(10);
  }
}
