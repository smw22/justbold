import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateConnectionDto {
  @IsNotEmpty()
  @IsUUID()
  targetUserId: string;
}
