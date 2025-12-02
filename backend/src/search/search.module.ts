import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Collaboration } from "../collaborations/entities/collaboration.entity";
import { Service } from "../services/entities/service.entity";
import { Tag } from "../tags/entities/tag.entity";
import { Post } from "../posts/entities/post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Collaboration, Service, Tag, Post])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
