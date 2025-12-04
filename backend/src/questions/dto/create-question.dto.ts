import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsUUID()
  @IsNotEmpty()
  user_id: string;
}
