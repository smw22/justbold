import { Module } from "@nestjs/common";
import { CollaborationsService } from "./collaborations.service";
import { CollaborationsController } from "./collaborations.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Collaboration } from "./entities/collaboration.entity";
import { Genre } from "../genres/entities/genre.entity";
import { Tag } from "../tags/entities/tag.entity";
import { Skill } from "../skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";
@Module({
  imports: [TypeOrmModule.forFeature([Collaboration, Genre, Tag, Skill, User])],
  controllers: [CollaborationsController],
  providers: [CollaborationsService],
})
export class CollaborationsModule {}
