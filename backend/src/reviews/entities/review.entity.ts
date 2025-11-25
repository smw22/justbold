import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Service } from "../../services/entities/service.entity";

@Entity()
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // The user who has received the review
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  // The user who has sent the review
  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "sender_id" })
  sender: User;

  @ManyToOne(() => Service, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "service_id" })
  service: Service;

  @Column("int")
  raiting: number;

  @Column("text")
  content: string;

  @Column()
  type: string;

  @CreateDateColumn()
  craeted: Date;
}
