import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  content: string;
}
