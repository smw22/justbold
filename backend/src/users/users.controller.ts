import { Controller, Get, Post, Body, Patch, Param, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get()
  async findCurrent(@Req() req: Request & { user: { id: string } }) {
    try {
      const userId = req.user.id;
      const data = await this.usersService.findOne(userId);
      return {
        success: true,
        data,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
      };
    }
  }

  @Patch()
  async update(@Req() req: Request & { user: { id: string } }, @Body() updateUserDto: UpdateUserDto) {
    try {
      const userId = req.user.id;
      const data = await this.usersService.update(userId, updateUserDto);
      return {
        success: true,
        data,
        message: "User updated successfully",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
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
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
      };
    }
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
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
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
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
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
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
      };
    }
  }
}
