import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  @IsNumber()
  questionBankId: number;
}
