import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto, @Req() req: Request & { user: { id: string } }) {
    try {
      const userId = req.user.id;
      const data = await this.servicesService.create(createServiceDto, userId);

      return {
        success: true,
        data,
        message: "Service created successfully",
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
  async findAll(@Query("page") page: string = "1", @Query("limit") limit: string = "10") {
    try {
      const pageNumber = Math.max(1, parseInt(page, 10) || 1);
      const limitNumber = Math.min(50, Math.max(1, parseInt(limit, 10) || 10)); // Max 50 per page

      const data = await this.servicesService.findAll(pageNumber, limitNumber);
      return {
        success: true,
        data,
        message: "Services retrieved successfully",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
      };
    }
  }

  @Get("search")
  async searchByTitle(
    @Query("search") search: string,
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10"
  ) {
    try {
      const pageNumber = Math.max(1, parseInt(page, 10) || 1);
      const limitNumber = Math.min(50, Math.max(1, parseInt(limit, 10) || 10)); // Max 50 per page
      const data = await this.servicesService.searchByTitle(search, pageNumber, limitNumber);
      return {
        success: true,
        data,
        message: "Services retrieved successfully",
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
      const data = await this.servicesService.findOne(id);
      return {
        success: true,
        data,
        message: "Service retrieved successfully",
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
  async findServiceReviews(@Param("id") id: string) {
    try {
      const data = await this.servicesService.findServiceReviews(id);
      return {
        success: true,
        data,
        message: "Service reviews retrieved successfully",
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
    @Body() updateServiceDto: UpdateServiceDto,
    @Req() req: Request & { user: { id: string } }
  ) {
    try {
      const userId = req.user.id;
      const service = await this.servicesService.findOne(id);
      if (!service) {
        throw new Error("Service not found");
      }
      if (service.user.id !== userId) {
        throw new Error("You are not authorized to update this service");
      }
      const updatedService = await this.servicesService.update(id, updateServiceDto);
      return {
        success: true,
        data: updatedService,
        message: "Service updated successfully",
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
      const service = await this.servicesService.findOne(id);
      if (!service) {
        throw new Error("Service not found");
      }
      if (service.user.id !== userId) {
        throw new Error("You are not authorized to delete this service");
      }
      await this.servicesService.remove(id);
      return {
        success: true,
        message: "Service removed successfully",
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
