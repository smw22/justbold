import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { GenresService } from "./genres.service";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";

@Controller("genres")
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  async create(@Body() createGenreDto: CreateGenreDto) {
    try {
      const data = await this.genresService.create(createGenreDto);
      return {
        success: true,
        data,
        message: "Genre created successfully",
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
      const data = await this.genresService.findAll();
      return {
        success: true,
        data,
        message: "Genres retrieved successfully",
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
      const data = await this.genresService.findOne(normalizedTitle);
      return {
        success: true,
        data,
        message: "Genre retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(":title")
  async update(@Param("title") title: string, @Body() updateGenreDto: UpdateGenreDto) {
    try {
      const normalizedTitle = title.replace(/-/g, " ");
      const data = await this.genresService.update(normalizedTitle, updateGenreDto);
      return {
        success: true,
        data,
        message: "Genre updated successfully",
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
      const data = await this.genresService.remove(normalizedTitle);
      return {
        success: true,
        data,
        message: "Genre removed successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
