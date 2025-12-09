import { PartialType } from "@nestjs/mapped-types";
import { CreateCommentDto } from "./create-comment.dto";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  parentId?: string;
}
