import { IsString, IsOptional, IsBoolean, IsArray, IsUUID } from "class-validator";

export class UpdateCollaborationDto {
  @IsOptional()
  @IsString()
  media?: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsArray()
  @IsOptional()
  @IsUUID("4", { each: true })
  genreIds: string[];

  @IsOptional()
  @IsBoolean()
  paid?: boolean;

  @IsOptional()
  @IsString()
  location?: string;

  @IsArray()
  @IsOptional()
  @IsUUID("4", { each: true })
  tagIds: string[];
}
