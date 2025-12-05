import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Post } from "../../posts/entities/post.entity";
import { Collaboration } from "../../collaborations/entities/collaboration.entity";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true, length: 50 })
  title: string; // "recording", "mixing", etc.

  // Relations
  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

  @ManyToMany(() => Collaboration, (collaboration) => collaboration.tags)
  collaborations: Collaboration[];
}
