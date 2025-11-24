import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Post } from "../../posts/entities/post.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Post, { eager: true })
  @JoinColumn({ name: "post_id" })
  post: Post;

  // The user who has made the comment
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Comment, { nullable: true })
  @JoinColumn({ name: "parent_id" })
  parent: Comment;

  @Column("text")
  content: string;

  @CreateDateColumn()
  created: Date;
}
