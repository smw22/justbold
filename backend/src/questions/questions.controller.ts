import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      const data = await this.questionsService.create(createQuestionDto);
      return {
        success: true,
        data,
        message: "Question created successfully",
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
  findAll() {
    return {
      success: true,
      message: "Questions can be retrieved from the /user/:id/questions endpoint",
    };
  }
}
