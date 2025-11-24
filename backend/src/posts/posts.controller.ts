import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      const data = await this.postsService.create(createPostDto);
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
  async findAll() {
    try {
      const data = await this.postsService.findAll();
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
