import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Post } from "src/posts/entities/post.entity";
import { Comment } from "src/comments/entities/comment.entity";

@Entity()
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // The user who has given the like
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Post, (post) => post.likes, { nullable: true })
  @JoinColumn({ name: "object_id" })
  post: Post | null;

  @ManyToOne(() => Comment, (comment) => comment.likes, { nullable: true })
  @JoinColumn({ name: "object_id" })
  comment: Comment | null;

  @Column()
  object_id: string;

  @Column()
  type: string; // "post" or "comment"

  @CreateDateColumn()
  created: Date;
}
