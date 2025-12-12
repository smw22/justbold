import { IsString, IsBoolean, IsOptional, IsArray, IsUUID } from "class-validator";

export class CreateCollaborationDto {
  @IsOptional()
  @IsString()
  media?: string;

  @IsString()
  title: string;

  @IsString()
  role: string;

  @IsString()
  content: string;

  @IsArray()
  @IsUUID("4", { each: true })
  genreIds: string[];

  @IsOptional()
  @IsBoolean()
  paid?: boolean;

  @IsOptional()
  @IsString()
  location?: string;

  @IsArray()
  @IsUUID("4", { each: true })
  tagIds: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skillIds?: string[];

  @IsArray()
  @IsUUID("4", { each: true })
  @IsOptional()
  userIds?: string[];
}
