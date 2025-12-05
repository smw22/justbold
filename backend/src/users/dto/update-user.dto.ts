import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsString, IsEmail, IsNumber, IsArray, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNumber()
  year_of_birth?: number;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsString()
  instagram?: string | null;

  @IsOptional()
  @IsString()
  twitter?: string | null;

  @IsOptional()
  @IsString()
  facebook?: string | null;

  @IsOptional()
  @IsString()
  youtube?: string | null;

  @IsOptional()
  @IsString()
  tiktok?: string | null;

  @IsOptional()
  @IsString()
  spotify_embed_link?: string | null;

  @IsOptional()
  @IsArray()
  videos?: string[];

  @IsOptional()
  @IsArray()
  looking_for?: string[];

  @IsOptional()
  @IsString()
  subscription?: string;

  @IsOptional()
  @IsString()
  user_type?: string;

  @IsOptional()
  @IsArray()
  genres?: string[];

  @IsOptional()
  @IsString()
  profile_image?: string;
}
