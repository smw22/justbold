import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Tag } from "../../tags/entities/tag.entity";

@Entity()
export class Service {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // the user who is offering the service
  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Tag, { eager: true })
  @JoinColumn({ name: "tag_id" })
  tags: Tag[];

  @Column({ nullable: true })
  media: string;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @Column("decimal", { nullable: true })
  price: number;

  @Column({ nullable: true })
  location: string;

  @CreateDateColumn()
  created: Date;
}
