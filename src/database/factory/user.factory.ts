import { Factory, Faker } from '@mikro-orm/seeder';
import { User } from '../entities';

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    return {
      username: faker.name.firstName(),
      password: faker.random.alphaNumeric(12),
      email: faker.internet.email(),
    };
  }
}
