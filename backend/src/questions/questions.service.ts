import { Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "./entities/question.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const user = await this.usersRepository.findOne({
      where: { id: createQuestionDto.user_id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const questionData = this.questionsRepository.create({
      question: createQuestionDto.question,
      user,
    });

    const savedQuestion = await this.questionsRepository.save(questionData);

    // Transform the response to exclude the full user object
    const { user: _, ...questionWithoutUser } = savedQuestion;
    return questionWithoutUser;
  }
}
