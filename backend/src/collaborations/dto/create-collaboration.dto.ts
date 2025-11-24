import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  IsUUID,
} from "class-validator";

export class CreateCollaborationDto {
  @IsUUID()
  user_id: string;

  @IsOptional()
  @IsString()
  media?: string;

  @IsString()
  title: string;

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
}
