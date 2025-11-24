import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Tag {
  @PrimaryColumn()
  title: string;
}
