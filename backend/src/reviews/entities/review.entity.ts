import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  rating: number;

  @Column({ charset: "utf8mb4" })
  content: string;

  @Column()
  type: string;

  @Column("uuid")
  object_id: string;

  @ManyToOne(() => User, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "sender_id" })
  sender: User;

  @CreateDateColumn()
  created: Date;
}
