import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Message } from "../../messages/entities/message.entity";

@Entity()
export class Thread {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // The users participating in the thread
  @ManyToMany(() => User, { eager: true })
  @JoinTable({ name: "thread_users" })
  users: User[];

  @CreateDateColumn()
  created: Date;

  @OneToMany(() => Message, (message) => message.thread, { cascade: true })
  messages: Message[];
}
