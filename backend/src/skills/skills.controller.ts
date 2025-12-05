import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { SkillsService } from "./skills.service";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";

@Controller("skills")
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto) {
    try {
      const data = await this.skillsService.create(createSkillDto);
      return {
        success: true,
        data,
        message: "Skill created successfully",
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
      const data = await this.skillsService.findAll();
      return {
        success: true,
        data,
        message: "Skills retrieved successfully",
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
      const data = await this.skillsService.findOne(normalizedTitle);
      return {
        success: true,
        data,
        message: "Skill retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(":title")
  async update(@Param("title") title: string, @Body() updateSkillDto: UpdateSkillDto) {
    try {
      const normalizedTitle = title.replace(/-/g, " ");
      const data = await this.skillsService.update(normalizedTitle, updateSkillDto);
      return {
        success: true,
        data,
        message: "Skill updated successfully",
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
      const data = await this.skillsService.remove(normalizedTitle);
      return {
        success: true,
        data,
        message: "Skill removed successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
