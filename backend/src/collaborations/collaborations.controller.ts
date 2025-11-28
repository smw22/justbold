import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query, // <-- add Query import
} from "@nestjs/common";
import { CollaborationsService } from "./collaborations.service";
import { CreateCollaborationDto } from "./dto/create-collaboration.dto";
import { UpdateCollaborationDto } from "./dto/update-collaboration.dto";

@Controller("collaborations")
export class CollaborationsController {
  constructor(private readonly collaborationsService: CollaborationsService) {}

  @Post()
  async create(@Body() createCollaborationDto: CreateCollaborationDto) {
    try {
      const data = await this.collaborationsService.create(
        createCollaborationDto
      );
      return {
        success: true,
        data,
        message: "Collaboration created successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll(
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10"
  ) {
    try {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      const { data } = await this.collaborationsService.findAll(
        pageNum,
        limitNum
      );
      return {
        success: true,
        data,
        message: "Collaborations retrieved successfully",
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
      const data = await this.collaborationsService.findOne(id);
      return {
        success: true,
        data,
        message: "Collaboration retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCollaborationDto: UpdateCollaborationDto
  ) {
    try {
      const data = await this.collaborationsService.update(
        id,
        updateCollaborationDto
      );
      return {
        success: true,
        data,
        message: "Collaboration updated successfully",
      };
    } catch (error) {}
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      const data = await this.collaborationsService.remove(id);
      return {
        success: true,
        data: {
          title: data.title,
        },
        message: "Collaboration removed successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
