import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query, // <-- add Query import
  Req,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { LikesController } from "src/likes/likes.controller";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req) {
    try {
      const userId = req.user.id;
      const data = await this.postsService.create(createPostDto, userId);
      return {
        success: true,
        data,
        message: "Post created successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll(@Query("page") page: string = "1", @Query("limit") limit: string = "10", @Req() req) {
    try {
      const userId = req.user?.id;
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      const { data } = await this.postsService.findAll(pageNum, limitNum, userId);
      return {
        success: true,
        data,
        message: "Posts retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Req() req) {
    try {
      const userId = req.user?.id;
      const data = await this.postsService.findOne(id, userId);
      return {
        success: true,
        data,
        message: "Post retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      const data = await this.postsService.update(id, updatePostDto);
      updatePostDto;
      return {
        success: true,
        data,
        message: "Post updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      const data = await this.postsService.remove(id);
      return {
        success: true,
        data: {
          title: data.title,
        },
        message: "Post deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(":id/likes")
  async getLikes(@Param("id") id: string) {
    try {
      const data = await this.postsService.getLikes(id);
      return {
        success: true,
        totalLiks: data.length,
        data,
        message: "Post likes retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post(":id/likes")
  async addLike(@Param("id") id: string, @Req() req) {
    try {
      const userId = req.user.id;
      const data = await this.postsService.addLike(id, userId);
      // Fetch updated total likes
      const likes = await this.postsService.getLikes(id);
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
      const data = await this.postsService.removeLike(id, userId);
      const likes = await this.postsService.getLikes(id);
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
