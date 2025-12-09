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

  // Fetch threads for a specific user (logged in user), and include only the latest message per thread
  async findAllSingularChats(userId: string): Promise<Thread[]> {
    const threads = await this.threadsRepository
      .createQueryBuilder("thread")
      .innerJoin("thread.messages", "message")
      .innerJoin("message.user", "messageUser")
      .leftJoinAndSelect("thread.messages", "allMessages")
      .leftJoinAndSelect("allMessages.user", "allMessageUsers")
      .where("messageUser.id = :userId", { userId })
      // Ensure the thread includes only two participants (1:1 chats)
      .groupBy("thread.id")
      .having("COUNT(DISTINCT allMessageUsers.id) = :userCount", { userCount: 2 })
      .orderBy("thread.created", "DESC")
      .addOrderBy("allMessages.created", "DESC")
      .getMany();

    // Keep only the latest message per thread (no overfetching unused data)
    return threads.map((thread) => ({
      ...thread,
      messages: thread.messages.slice(0, 1),
    }));
  }

  async findAllGroupChats(userId: string): Promise<Thread[]> {
    const threads = await this.threadsRepository
      .createQueryBuilder("thread")
      .innerJoin("thread.messages", "message")
      .innerJoin("message.user", "messageUser")
      .leftJoinAndSelect("thread.messages", "allMessages")
      .leftJoinAndSelect("allMessages.user", "allMessageUsers")
      .where("messageUser.id = :userId", { userId })
      // Ensure the thread includes more than two participants (group chats)
      .orderBy("thread.created", "DESC")
      .addOrderBy("allMessages.created", "DESC")
      .getMany();

    // Keep only the latest message per thread (no overfetching unused data)
    return threads.map((thread) => ({
      ...thread,
      messages: thread.messages.slice(0, 1),
    }));
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
