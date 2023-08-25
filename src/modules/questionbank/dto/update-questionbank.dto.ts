import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionbankDto } from './create-questionbank.dto';

export class UpdateQuestionbankDto extends PartialType(CreateQuestionbankDto) {}
