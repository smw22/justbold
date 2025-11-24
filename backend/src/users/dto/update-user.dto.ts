import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsString, IsOptional, IsEmail, IsNumber, IsArray } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsNumber()
  year_of_birth: number;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsString()
  theme: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  twitter?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  youtube?: string;

  @IsOptional()
  @IsString()
  tiktok?: string;

  @IsOptional()
  @IsString()
  spotify_embed_link?: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsArray()
  videos?: string[];

  @IsOptional()
  @IsArray()
  connections?: string[];

  @IsOptional()
  @IsArray()
  looking_for?: string[];

  @IsOptional()
  @IsArray()
  genres?: string[];

  @IsString()
  subscription: string;

  @IsString()
  user_type: string;
}
