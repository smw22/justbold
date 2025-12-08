import { IsString, IsOptional, IsArray, IsUUID } from "class-validator";

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  media?: string;

  @IsArray()
  @IsUUID("4", { each: true })
  tagIds: string[];
}
