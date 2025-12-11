import { PartialType } from "@nestjs/mapped-types";
import { CreateQuestionDto } from "./create-question.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  answer?: string;
}
