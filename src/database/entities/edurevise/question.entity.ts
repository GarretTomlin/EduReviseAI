import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { QuestionBank } from './question-bank.entity';
import { User } from './user.entity';

@Entity()
export class Question {
  @PrimaryKey()
  id!: number;

  @Property({ type: 'longtext' })
  message!: string;

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => QuestionBank)
  questionBank!: QuestionBank;

  constructor(message: string, author: User, questionBank: QuestionBank) {
    this.message = message;
    this.author = author;
    this.questionBank = questionBank;
  }
}
