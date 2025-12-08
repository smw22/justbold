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
  async findAll(@Query("threadId") threadId: string, @Query("userId") userId: string) {
    try {
      const data = await this.messagesService.findAll(threadId, userId);

      if (!threadId || !userId) {
        throw new BadRequestException("threadId and userId query params are required");
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

  @Get(":threadId")
  async findOne(@Param("threadId") threadId: string) {
    try {
      const data = await this.messagesService.findOne(threadId);

      if (!threadId) {
        throw new BadRequestException("threadId param is required");
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

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.messagesService.remove(+id);
  }
}
