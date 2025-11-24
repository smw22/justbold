import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsUUID,
} from "class-validator";

export class UpdateCollaborationDto {
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
