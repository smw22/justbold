import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateManyQuestionsDto } from "./dto/update-many-questions.dto";

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
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch("user/:userId")
  async updateManyQuestions(@Param("userId") userId: string, @Body() body: any) {
    console.log("Body:", body);
    return this.questionsService.updateMany(body.questions, userId);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.questionsService.remove(+id);
  }
}
