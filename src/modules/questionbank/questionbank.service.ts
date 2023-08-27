/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateQuestionbankDto } from './dto/create-questionbank.dto';
import { UpdateQuestionbankDto } from './dto/update-questionbank.dto';

@Injectable()
export class QuestionbankService {
  create(createQuestionbankDto: CreateQuestionbankDto) {
    return 'This action adds a new questionbank';
  }

  findAll() {
    return `This action returns all questionbank`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionbank`;
  }

  update(id: number, updateQuestionbankDto: UpdateQuestionbankDto) {
    return `This action updates a #${id} questionbank`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionbank`;
  }
}
