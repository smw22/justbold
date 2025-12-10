import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from "@nestjs/common";
import { CollaborationsService } from "./collaborations.service";
import { CreateCollaborationDto } from "./dto/create-collaboration.dto";
import { UpdateCollaborationDto } from "./dto/update-collaboration.dto";

@Controller("collaborations")
export class CollaborationsController {
  constructor(private readonly collaborationsService: CollaborationsService) {}

  @Post()
  async create(@Body() createCollaborationDto: CreateCollaborationDto, @Req() req: Request & { user: { id: string } }) {
    try {
      const userId = req.user.id;
      const data = await this.collaborationsService.create(createCollaborationDto, userId);
      return {
        success: true,
        data,
        message: "Collaboration created successfully",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
      };
    }
  }

  @Get()
  async findAll(
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10",
    @Query("role") role: string = "",
    @Query("genre") genre: string = "",
    @Query("orderBy") orderBy: string = "created"
  ) {
    try {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      const { data } = await this.collaborationsService.findAll(pageNum, limitNum, genre, orderBy);
      return {
        success: true,
        data,
        message: "Collaborations retrieved successfully",
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
      const data = await this.collaborationsService.findOne(id);
      return {
        success: true,
        data,
        message: "Collaboration retrieved successfully",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
      };
    }
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCollaborationDto: UpdateCollaborationDto,
    @Req() req: Request & { user: { id: string } }
  ) {
    try {
      const userId = req.user.id;
      const collaboration = await this.collaborationsService.findOne(id);
      if (!collaboration) {
        throw new Error("Collaboration not found");
      }
      if (collaboration.user.id !== userId) {
        throw new Error("You are not authorized to update this collaboration");
      }
      const data = await this.collaborationsService.update(id, updateCollaborationDto);
      return {
        success: true,
        data,
        message: "Collaboration updated successfully",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
      };
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Req() req: Request & { user: { id: string } }) {
    try {
      const userId = req.user.id;
      const collaboration = await this.collaborationsService.findOne(id);
      if (!collaboration) {
        throw new Error("Collaboration not found");
      }
      if (collaboration.user.id !== userId) {
        throw new Error("You are not authorized to delete this collaboration");
      }
      const data = await this.collaborationsService.remove(id);
      return {
        success: true,
        data: {
          title: data.title,
        },
        message: "Collaboration removed successfully",
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
