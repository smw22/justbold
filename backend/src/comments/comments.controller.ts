import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Like } from "../likes/entities/like.entity";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentsService.remove(+id);
  }

  @Post(":id/likes")
  async addLike(@Param("id") id: string, @Req() req) {
    try {
      const userId = req.user.id;
      const data = await this.commentsService.addLike(id, userId);
      // Fetch updated total likes
      const likes = await this.commentsService.getLikes(id);
      return {
        success: true,
        totalLikes: likes.length,
        data,
        message: "Like added successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(":id/likes")
  async removeLike(@Param("id") id: string, @Req() req) {
    try {
      const userId = req.user.id;
      const data = await this.commentsService.removeLike(id, userId);
      const likes = await this.commentsService.getLikes(id);
      return {
        success: true,
        totalLikes: likes.length,
        data,
        message: "Like removed successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
