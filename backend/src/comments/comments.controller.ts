import { Controller, Get, Post, Param, Delete, Req } from "@nestjs/common";
import { CommentsService } from "./comments.service";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll() {
    return {
      success: true,
      message: "Create and get comments from the /posts/:postId/comments endpoint",
    };
  }

  @Post(":id/likes")
  async addLike(@Param("id") id: string, @Req() req: Request & { user: { id: string } }) {
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
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
      };
    }
  }

  @Delete(":id/likes")
  async removeLike(@Param("id") id: string, @Req() req: Request & { user: { id: string } }) {
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
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
      };
    }
  }
}
