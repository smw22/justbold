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
      // Join to get only threads where the user is a participant
      .innerJoin("thread.users", "currentUser", "currentUser.id = :userId", { userId })
      // Load all participants for each thread
      .leftJoinAndSelect("thread.users", "participants")
      // Load the latest message
      .leftJoinAndSelect("thread.messages", "messages")
      .leftJoinAndSelect("messages.user", "messageUser")
      // Filter for 1:1 chats (exactly 2 participants)
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select("COUNT(tu.userId)")
          .from("thread_users", "tu")
          .where("tu.threadId = thread.id")
          .getQuery();
        return `(${subQuery}) = 2`;
      })
      .orderBy("thread.created", "DESC")
      .addOrderBy("messages.created", "DESC")
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
      // Join to get only threads where the user is a participant
      .innerJoin("thread.users", "currentUser", "currentUser.id = :userId", { userId })
      // Load all participants for each thread
      .leftJoinAndSelect("thread.users", "participants")
      // Load the latest message
      .leftJoinAndSelect("thread.messages", "messages")
      .leftJoinAndSelect("messages.user", "messageUser")
      // Filter for group chats (more than 2 participants)
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select("COUNT(tu.userId)")
          .from("thread_users", "tu")
          .where("tu.threadId = thread.id")
          .getQuery();
        return `(${subQuery}) > 2`;
      })
      .orderBy("thread.created", "DESC")
      .addOrderBy("messages.created", "DESC")
      .getMany();

    // Keep only the latest message per thread
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
