import { IsNotEmpty, IsString, Max, Min } from "class-validator";
export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @Min(2)
  @Max(50)
  title: string;
}
