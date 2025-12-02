import { IsString, IsOptional, IsEnum, IsInt, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export enum SearchCategory {
  ALL = "all",
  PEOPLE = "people",
  COLLABORATIONS = "collaborations",
  SERVICES = "services",
  TAGS = "tags",
}

export class SearchQueryDto {
  @IsString()
  @IsOptional()
  query?: string;

  @IsEnum(SearchCategory)
  @IsOptional()
  category?: SearchCategory = SearchCategory.ALL; // Defaults to "all"

  @IsInt()
  @Min(1)
  @Type(() => Number) // Converts URL string "1" to actual number 1
  @IsOptional()
  page?: number = 1;

  @IsInt()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;
}
