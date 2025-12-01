import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Tag } from "../../tags/entities/tag.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable({ name: "posts_tags" })
  tags: Tag[];

  @Column()
  media: string;

  // Foreign key to User entity
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created: Date;
}
