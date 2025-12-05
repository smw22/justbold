import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
// Add relation imports as needed, e.g.:
// import { Service } from "../../services/entities/service.entity";
// import { Post } from "../../posts/entities/post.entity";
import { Collaboration } from "../../collaborations/entities/collaboration.entity";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true, length: 50 })
  title: string;

  // Relations (add as needed)
  // @OneToMany(() => Service, (service) => service.genre)
  // services: Service[];

  // @ManyToMany(() => Post, (post) => post.genres)
  // posts: Post[];

  @ManyToMany(() => Collaboration, (collaboration) => collaboration.genres)
  collaborations: Collaboration[];
}
