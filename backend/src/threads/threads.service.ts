import { Injectable } from "@nestjs/common";
import { CreateThreadDto } from "./dto/create-thread.dto";
import { UpdateThreadDto } from "./dto/update-thread.dto";
import { Thread } from "./entities/thread.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly threadsRepository: Repository<Thread>
  ) {}

  create(createThreadDto: CreateThreadDto) {
    return "This action adds a new thread";
  }

  async findAll(userId: string): Promise<Thread[]> {
    const threads = await this.threadsRepository
      .createQueryBuilder("thread")
      .innerJoin("thread.users", "user")
      .leftJoinAndSelect("thread.messages", "message")
      .where("user.id = :userId", { userId })
      .orderBy("thread.created", "DESC")
      .addOrderBy("message.created", "ASC")
      .getMany();

    return threads;
  }

  findOne(id: number) {
    return `This action returns a #${id} thread`;
  }

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return `This action updates a #${id} thread`;
  }

  remove(id: number) {
    return `This action removes a #${id} thread`;
  }
}
