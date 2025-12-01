import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Post } from "../../posts/entities/post.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  year_of_birth: number;

  @Column({ default: "Jeg mangler at skrive min bio." })
  bio: string;

  @Column({ default: "Her skriver jeg noget om mig selv." })
  about: string;

  @Column()
  location: string;

  @Column({ default: "header-bg-1" })
  theme: string;

  @Column("simple-array")
  connections: string[];

  @Column({ type: "varchar", nullable: true, default: null })
  instagram: string | null;

  @Column({ type: "varchar", nullable: true, default: null })
  twitter: string | null;

  @Column({ type: "varchar", nullable: true, default: null })
  facebook: string | null;

  @Column({ type: "varchar", nullable: true, default: null })
  youtube: string | null;

  @Column({ type: "varchar", nullable: true, default: null })
  tiktok: string | null;

  @Column({ type: "varchar", nullable: true, default: null })
  spotify_embed_link: string | null;

  @Column("simple-array")
  videos: string[];

  @Column("simple-array")
  looking_for: string[];

  @Column()
  subscription: string;

  @Column()
  user_type: string;

  @Column("simple-array")
  genres: string[];

  @Column()
  profile_image: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
