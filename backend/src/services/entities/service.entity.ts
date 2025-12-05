import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
@Entity()
@Index(["user", "created"]) // Composite index for queries
export class Service {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // the user who is offering the service
  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "user_id" })
  @Index() // Add index for faster lookups
  user: User;

  @Column({ type: "varchar", length: 500, nullable: true })
  media: string;

  @Column({ type: "varchar", length: 100 })
  @Index() // Index for search functionality
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  price: number;

  @Column({ type: "varchar", length: 255 })
  location: string;

  @Column({ type: "varchar", length: 100 })
  category: string;

  @CreateDateColumn()
  created: Date;

  // Track when service was last updated
  @UpdateDateColumn()
  updated: Date;
}
