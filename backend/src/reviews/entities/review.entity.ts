import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // The user who has received the review
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  // The user who has sent the review
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "sender_id" })
  sender: User;

  @Column("int")
  raiting: number;

  @Column("text")
  content: string;

  @Column()
  type: string;

  @CreateDateColumn()
  created: Date;
}
