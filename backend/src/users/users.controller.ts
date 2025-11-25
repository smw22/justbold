import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
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
<<<<<<< HEAD
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
=======
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
>>>>>>> origin/main
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
      const data = await this.usersService.findUserPosts(id);
      return {
        success: true,
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
}
