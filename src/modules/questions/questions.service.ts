import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Question, QuestionBank, User } from '../../database/entities';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QueryBuilderService } from '../../shared/utils/query-builder.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: EntityRepository<Question>,
    @InjectRepository(QuestionBank)
    private readonly questionBankRepository: EntityRepository<QuestionBank>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly queryBuilderService: QueryBuilderService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const { message, authorId, questionBankId } = createQuestionDto;

    const author = await this.userRepository.findOne(authorId);
    if (!author) {
      throw new NotFoundException(`User with ID ${authorId} not found`);
    }

    const questionBank =
      await this.questionBankRepository.findOne(questionBankId);
    if (!questionBank) {
      throw new NotFoundException(
        `Question bank with ID ${questionBankId} not found`,
      );
    }

    const question = new Question(message, author, questionBank);

    await this.questionRepository.create(question);

    return question;
  }

  async findAll(query?: Record<string, any>): Promise<any[]> {
    if (query) {
      return this.queryBuilderService.buildQuery(() => Question, query);
    }
    return this.questionRepository.findAll();
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOneOrFail(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.findOneOrFail(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    this.questionRepository.nativeUpdate(question, updateQuestionDto);
    return question;
  }

  async remove(id: number) {
    const question = await this.questionRepository.findOneOrFail(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    this.questionRepository.nativeDelete(question);
    return `Question with ID ${id} removed successfully`;
  }
}
