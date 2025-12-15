import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, Req } from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { CreateThreadDto } from "./dto/create-thread.dto";
import { UpdateThreadDto } from "./dto/update-thread.dto";

@Controller("threads")
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  async create(@Body() createThreadDto: CreateThreadDto, @Req() req: Request & { user: { id: string } }) {
    try {
      const userId = req.user.id;
      const data = await this.threadsService.create(createThreadDto, userId);
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

  @Get()
  async findAll(@Query("userId") userId: string) {
    if (!userId) {
      throw new BadRequestException("userId query param is required");
    }

    try {
      const data = await this.threadsService.findAllSingularChats(userId);

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

  @Get("group-chats")
  async findAllGroupChats(@Query("userId") userId: string) {
    if (!userId) {
      throw new BadRequestException("userId query param is required");
    }

    try {
      const data = await this.threadsService.findAllGroupChats(userId);

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

  @Get(":threadId")
  async findOne(@Param("threadId") threadId: string) {
    try {
      const data = await this.threadsService.findOne(threadId);
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
  update(@Param("id") id: string, @Body() updateThreadDto: UpdateThreadDto) {
    return this.threadsService.update(+id, updateThreadDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.threadsService.remove(+id);
  }
}
