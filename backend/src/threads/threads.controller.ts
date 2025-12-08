import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { CreateThreadDto } from "./dto/create-thread.dto";
import { UpdateThreadDto } from "./dto/update-thread.dto";

@Controller("threads")
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  create(@Body() createThreadDto: CreateThreadDto) {
    return this.threadsService.create(createThreadDto);
  }

  @Get()
  async findAll(@Query("userId") userId: string) {
    try {
      const data = await this.threadsService.findAll(userId);

      if (!userId) {
        throw new BadRequestException("userId query param is required");
      }

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
  findOne(@Param("id") id: string) {
    return this.threadsService.findOne(+id);
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
