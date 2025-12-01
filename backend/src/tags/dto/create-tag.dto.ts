import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @Min(2)
  @Max(50)
  title: string;
}
