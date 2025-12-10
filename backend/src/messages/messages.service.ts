import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";
import { Thread } from "../threads/entities/thread.entity";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @InjectRepository(Thread)
    private readonly threadsRepository: Repository<Thread>
  ) {}

  create(createMessageDto: CreateMessageDto) {
    return "This action adds a new message";
  }

  async findAll(threadId: string) {
    const thread = await this.threadsRepository
      .createQueryBuilder("thread")
      .leftJoinAndSelect("thread.users", "users")
      .where("thread.id = :threadId", { threadId })
      .getOne();

    if (!thread) {
      throw new NotFoundException("Thread not found");
    }

    const messages = await this.messagesRepository
      .createQueryBuilder("message")
      .innerJoin("message.thread", "thread")
      .leftJoinAndSelect("message.user", "user")
      .where("thread.id = :threadId", { threadId })
      .orderBy("message.created", "ASC")
      .getMany();

    return messages;
  }

  async findOne(threadId: string) {
    // Get the latest message in the thread
    // (not used for now as the threads endpoint already fetches messages)
    const message = await this.messagesRepository
      .createQueryBuilder("message")
      .innerJoin("message.thread", "thread")
      .leftJoinAndSelect("message.user", "user")
      .where("thread.id = :threadId", { threadId })
      .orderBy("message.created", "DESC")
      .getOne();

    return message;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
