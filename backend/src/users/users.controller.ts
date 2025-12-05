import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    try {
      const data = await this.usersService.findAll();
      return {
        success: true,
        data,
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
      const data = await this.usersService.findOne(id);
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const data = await this.usersService.update(id, updateUserDto);
      updateUserDto;
      return {
        success: true,
        data,
        message: "User updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Get(":id/posts")
  async findUserPosts(@Param("id") id: string) {
    try {
      const result = await this.usersService.findUserPosts(id); // <-- Don't destructure
      return {
        success: true,
        data: result.data,
        total_posts: result.total_posts,
        message: "User posts retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(":id/reviews")
  async findUserReviews(@Param("id") id: string) {
    try {
      const { data, avg_rating } = await this.usersService.findUserReviews(id);
      return {
        success: true,
        avg_rating,
        data,
        message: "User reviews retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(":id/questions")
  async findUserQuestions(@Param("id") id: string) {
    try {
      const data = await this.usersService.findUserQuestions(id);
      return {
        success: true,
        data,
        message: "User questions retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
