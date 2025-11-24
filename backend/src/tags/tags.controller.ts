import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Controller("tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    try {
      const data = await this.tagsService.create(createTagDto);
      return {
        success: true,
        data,
        message: "Tag created successfully",
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
      const data = await this.tagsService.findAll();
      return {
        success: true,
        data,
        message: "Tags retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(":title")
  async findOne(@Param("title") title: string) {
    try {
      const normalizedTitle = title.replace(/-/g, " ");
      const data = await this.tagsService.findOne(normalizedTitle);
      return {
        success: true,
        data,
        message: "Tag retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(":title")
  async update(
    @Param("title") title: string,
    @Body() updateTagDto: UpdateTagDto
  ) {
    try {
      const normalizedTitle = title.replace(/-/g, " ");
      const data = await this.tagsService.update(normalizedTitle, updateTagDto);
      return {
        success: true,
        data,
        message: "Tag updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(":title")
  async remove(@Param("title") title: string) {
    try {
      const normalizedTitle = title.replace(/-/g, " ");
      const data = await this.tagsService.remove(normalizedTitle);
      return {
        success: true,
        data,
        message: "Tag removed successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
