import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Genre } from "../../genres/entities/genre.entity";
import { Tag } from "../../tags/entities/tag.entity";

@Entity()
export class Collaboration {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ nullable: true })
  media: string;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @ManyToMany(() => Genre, { eager: true })
  @JoinTable({ name: "collaboration_genres" })
  genres: Genre[];

  @Column({ default: false })
  paid: boolean;

  @Column({ nullable: true })
  location: string;

  @CreateDateColumn()
  created: Date;

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable({ name: "collaboration_tags" })
  tags: Tag[];
}
