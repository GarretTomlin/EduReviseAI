import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Question, QuestionBank, User } from '../../database/entities';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: EntityRepository<Question>,
    @InjectRepository(QuestionBank)
    private readonly questionBankRepository: EntityRepository<QuestionBank>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
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

    this.questionRepository.create(question);
    return {
      question,
      message: `Question created successfully`,
      status: HttpStatus.CREATED,
    };
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.findAll();
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOneOrFail(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return {
      question,
      message: `Question with ID ${id} not found`,
      status: HttpStatus.NOT_FOUND,
    };
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.findOneOrFail(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    this.questionRepository.nativeUpdate(question, updateQuestionDto);
    return {
      question,
      message: `Question with ID ${id} updated successfully`,
      status: HttpStatus.OK,
    };
  }

  async remove(id: number) {
    const question = await this.questionRepository.findOneOrFail(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    this.questionRepository.nativeDelete(question);
    return {
      message: `Question with ID ${id} removed successfully`,
      status: HttpStatus.OK,
    };
  }
}
