import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Story {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // The user who has posted the story
  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ nullable: true })
  media: string;

  @CreateDateColumn()
  created: Date;
}
