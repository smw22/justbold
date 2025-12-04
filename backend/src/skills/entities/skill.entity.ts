import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Collaboration } from "../../collaborations/entities/collaboration.entity";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true, length: 100 })
  title: string;

  @ManyToMany(() => Collaboration, (collaboration) => collaboration.skills)
  collaborations: Collaboration[];
}
