import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Post } from "../../posts/entities/post.entity";
import { User } from "../../users/entities/user.entity";
import { Like } from "src/likes/entities/like.entity";

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

  // Parent comment (null for top-level comments)
  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  @JoinColumn({ name: "parent_id" })
  parent: Comment | null;

  // Child comments (replies to this comment)
  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];

  // Likes on this comment
  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];

  @Column("text")
  content: string;

  @CreateDateColumn()
  created: Date;
}
