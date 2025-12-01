import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Tag } from "../tags/entities/tag.entity";
import { Like } from "../likes/entities/like.entity";
import { Comment } from "../comments/entities/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag, Like, Comment])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
