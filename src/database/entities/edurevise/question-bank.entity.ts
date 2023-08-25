import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Question } from './question.entity';

export enum Difficulty {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
  EXPERT = 4,
  MASTER = 5,
}

@Entity()
export class QuestionBank {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  category!: string;

  @Property()
  difficulty!: Difficulty;

  @OneToMany(() => Question, (question) => question.questionBank)
  questions = new Collection<Question>(this);

  constructor(name: string, category: string, difficulty: Difficulty) {
    this.name = name;
    this.category = category;
    this.difficulty = difficulty;
  }
}
