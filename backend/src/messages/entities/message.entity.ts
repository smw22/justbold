import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Thread } from "../../threads/entities/thread.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // the user who sent the message
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Thread, { eager: true })
  @JoinColumn({ name: "thread_id" })
  thread: Thread;

  @Column({ charset: "utf8mb4" })
  content: string;

  @CreateDateColumn()
  created: Date;
}
