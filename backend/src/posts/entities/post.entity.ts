import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @Column()
  tags: string;

  @Column()
  media: string;

  // Foreign key to User entity
  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created: Date;
}
