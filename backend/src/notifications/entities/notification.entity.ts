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
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // The user who will receive the notification
  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  object_id: string;

  @Column()
  object_type: string;

  @Column({ default: false })
  is_read: boolean;

  @CreateDateColumn()
  created: Date;
}
