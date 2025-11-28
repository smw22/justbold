import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // The user who has got the question
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column("text")
  question: string;

  @Column("text", { nullable: true })
  answer: string;

  @CreateDateColumn()
  created: Date;
}
