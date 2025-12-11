import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Post } from "../../posts/entities/post.entity";
import { User } from "../../users/entities/user.entity";
import { Like } from "../../likes/entities/like.entity";

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

  @ManyToOne(() => Comment, (comment) => comment.children, { nullable: true })
  @JoinColumn({ name: "parent_id" })
  parent: Comment | null;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];

  @Column({ charset: "utf8mb4" })
  content: string;

  @CreateDateColumn()
  created: Date;
}
