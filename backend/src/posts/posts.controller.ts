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
  async findAll(@Query("page") page: string = "1", @Query("limit") limit: string = "10") {
    try {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      const { data } = await this.postsService.findAll(pageNum, limitNum);
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
  async findOne(@Param("id") id: string) {
    try {
      const data = await this.postsService.findOne(id);
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
}
