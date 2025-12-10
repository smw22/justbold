import { PartialType } from "@nestjs/mapped-types";
import { CreateServiceDto } from "./create-service.dto";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  IsUrl,
  Min,
  Max,
  MaxLength,
  MinLength,
  IsIn,
} from "class-validator";

const categories = [
  "art",
  "recording",
  "rehearsal_space",
  "music_lessons",
  "instrument_rental",
  "mixing",
  "mastering",
  "songwriting",
  "music_production",
  "dj_services",
  "band_booking",
  "music_promotion",
  "sheet_music",
  "music_arrangement",
  "studio_musician",
  "audio_editing",
  "voice_over",
  "music_composition",
];

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsUrl() // Validates URL format if media is a URL
  media?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  content: string;

  @IsOptional()
  @IsNumber()
  @Min(0) // Price cannot be negative
  @Max(99999999.99)
  price: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  location: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @IsIn(categories)
  category: string;
}
