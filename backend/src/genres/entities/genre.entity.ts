import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Genre {
  @PrimaryColumn()
  title: string;
}
