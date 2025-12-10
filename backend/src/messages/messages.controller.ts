import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll(@Query("threadId") threadId: string) {
    if (!threadId) {
      throw new BadRequestException("threadId query param is required");
    }

    try {
      const data = await this.messagesService.findAll(threadId);

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
    if (!threadId) {
      throw new BadRequestException("threadId param is required");
    }

    try {
      const data = await this.messagesService.findOne(threadId);

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
  update(@Param("id") id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.messagesService.remove(+id);
  }
}
