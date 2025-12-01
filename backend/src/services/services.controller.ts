import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
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
  async findAll() {
    try {
      const data = await this.servicesService.findAll();
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

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateServiceDto: UpdateServiceDto
  ) {
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
