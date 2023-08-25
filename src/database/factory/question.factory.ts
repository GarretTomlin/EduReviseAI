import { Factory, Faker } from '@mikro-orm/seeder';
import { Question } from '../entities';
import { UserFactory } from './user.factory';
import { EntityManager } from '@mikro-orm/core';
import { QuestionBankFactory } from './question-bank.entity';

export class QuestionFactory extends Factory<Question> {
  model = Question;

  private userFactory: UserFactory;
  private questionBank: QuestionBankFactory;

  constructor(em: EntityManager) {
    super(em);
    this.userFactory = new UserFactory(em);
    this.questionBank = new QuestionBankFactory(em);
  }

  definition(faker: Faker): Partial<Question> {
    const user = this.userFactory.makeOne();
    const questionBank = this.questionBank.makeOne();

    return {
      message: faker.lorem.paragraph().substring(0, 255),
      author: user,
      questionBank: questionBank,
    };
  }
}
