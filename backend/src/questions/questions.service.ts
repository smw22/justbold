import { Injectable, HttpException } from "@nestjs/common";
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

  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  async updateMany(questions: { id: string; answer: string }[], userId?: string): Promise<Question[]> {
    const results = await Promise.all(
      questions.map(async (q) => {
        if (!q) {
          return null;
        }
        const { id, answer } = q;
        const question = await this.questionsRepository.findOne({
          where: { id },
          relations: ["user"],
        });
        if (question && question.user.id === userId) {
          question.answer = answer;
          return await this.questionsRepository.save(question);
        }
        return null;
      })
    );
    return results.filter((q): q is Question => q !== null);
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
