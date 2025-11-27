import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Service } from "../../services/entities/service.entity";
import { Post } from "../../posts/entities/post.entity";
import { Collaboration } from "../../collaborations/entities/collaboration.entity";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true, length: 50 })
  title: string; // "recording", "mixing", etc.

  // Relations
  @OneToMany(() => Service, (service) => service.tag)
  services: Service[];

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

  @ManyToMany(() => Collaboration, (collaboration) => collaboration.tags)
  collaborations: Collaboration[];
}
