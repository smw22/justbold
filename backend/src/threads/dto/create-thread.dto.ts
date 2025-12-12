import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateThreadDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  content: string;
}
