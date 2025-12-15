import { Controller, Get, Post, Body, Patch, Param, Req, NotFoundException, HttpException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ConnectionsService } from "../connections/connections.service";
import { Public } from "src/auth/public.decorator";

@Controller("user")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly connectionsService: ConnectionsService
  ) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.usersService.create(createUserDto);
      return {
        success: true,
        data,
        message: "User created successfully",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      let statusCode = 500;

      if (error instanceof HttpException) {
        statusCode = error.getStatus();
      }

      return {
        success: false,
        message,
        statusCode,
      };
    }
  }
  @Get()
  async findCurrent(@Req() req: Request & { user: { id: string } }) {
    try {
      const userId = req.user.id;
      const data = await this.usersService.findOne(userId);
      // Get accepted connections count
      let connections = 0;
      if (this.connectionsService && typeof this.connectionsService.countAcceptedConnections === "function") {
        connections = await this.connectionsService.countAcceptedConnections(userId);
      }
      return {
        success: true,
        data,
        connections,
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
      let connections = 0;
      if (this.connectionsService && typeof this.connectionsService.countAcceptedConnections === "function") {
        connections = await this.connectionsService.countAcceptedConnections(id);
      }
      return {
        success: true,
        data,
        connections,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new NotFoundException(message);
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
