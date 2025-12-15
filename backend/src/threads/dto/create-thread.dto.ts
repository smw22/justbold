import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateThreadDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  content: string;
}
