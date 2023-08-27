import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionbankService } from './questionbank.service';
import { CreateQuestionbankDto } from './dto/create-questionbank.dto';
import { UpdateQuestionbankDto } from './dto/update-questionbank.dto';

@Controller('questionbank')
export class QuestionbankController {
  constructor(private readonly questionbankService: QuestionbankService) {}

  @Post()
  create(@Body() createQuestionbankDto: CreateQuestionbankDto) {
    return this.questionbankService.create(createQuestionbankDto);
  }

  @Get()
  findAll() {
    return this.questionbankService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionbankService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionbankDto: UpdateQuestionbankDto,
  ) {
    return this.questionbankService.update(+id, updateQuestionbankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionbankService.remove(+id);
  }
}
