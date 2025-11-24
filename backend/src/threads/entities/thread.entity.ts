import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

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
}
