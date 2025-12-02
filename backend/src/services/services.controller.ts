import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    try {
      const data = await this.servicesService.create(createServiceDto);

      return {
        success: true,
        data,
        message: "Service created successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
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
      return {
        success: false,
        message: error.message,
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
      return {
        success: false,
        message: error.message,
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
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
    try {
      await this.servicesService.update(id, updateServiceDto);
      return {
        success: true,
        message: "Service updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      await this.servicesService.remove(id);
      return {
        success: true,
        message: "Service removed successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
