import { Factory, Faker } from '@mikro-orm/seeder';
import { QuestionBank } from '../entities';

export class QuestionBankFactory extends Factory<QuestionBank> {
  model = QuestionBank;

  definition(faker: Faker): Partial<QuestionBank> {
    return {
      name: faker.word.adjective(),
      category: faker.word.adjective(),
      difficulty: faker.datatype.number({ min: 1, max: 5 }),
    };
  }
}
