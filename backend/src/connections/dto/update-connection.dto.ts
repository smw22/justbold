import { IsIn, IsNotEmpty } from "class-validator";

export class UpdateConnectionDto {
  @IsNotEmpty()
  @IsIn(["accept", "decline"])
  action: "accept" | "decline";
}
