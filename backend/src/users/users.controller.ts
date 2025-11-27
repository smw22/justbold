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
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Get(":id/posts")
  async findUserPosts(@Param("id") id: string) {
    try {
      const [data, total] = await this.usersService.findUserPosts(id);
      return {
        success: true,
        total_posts: total,
        data,
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
    const { data, avg_rating } = await this.usersService.findUserReviews(id);
    return {
      success: true,
      avg_rating,
      data,
      message: "User reviews retrieved successfully",
    };
  }

  @Get(":id/questions")
  async findUserQuestions(@Param("id") id: string) {
    return this.usersService.findUserQuestions(id);
  }
}
