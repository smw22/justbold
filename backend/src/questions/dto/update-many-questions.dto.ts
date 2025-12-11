import { IsArray, ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";

export class QuestionAnswerDto {
  @IsString()
  id: string;

  @IsString()
  answer: string;
}

export class UpdateManyQuestionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionAnswerDto)
  questions: QuestionAnswerDto[];
}
