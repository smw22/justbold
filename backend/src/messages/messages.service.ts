import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";
import { Thread } from "../threads/entities/thread.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @InjectRepository(Thread)
    private readonly threadsRepository: Repository<Thread>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(createMessageDto: CreateMessageDto, userId: string, threadId: string): Promise<Message> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const thread = await this.threadsRepository.findOne({
      where: { id: threadId },
      relations: ["users"],
    });

    if (!thread) {
      throw new NotFoundException("Thread not found");
    }

    const isParticipant = thread.users.some((user) => user.id === userId);
    if (!isParticipant) {
      throw new ForbiddenException("You do not have access to this thread");
    }

    const message = this.messagesRepository.create({
      content: createMessageDto.content,
      user,
      thread,
    });

    return this.messagesRepository.save(message);
  }

  async findAll(threadId: string, userId: string): Promise<Message[]> {
    // Verify thread exists and get participants
    const thread = await this.threadsRepository
      .createQueryBuilder("thread")
      .leftJoinAndSelect("thread.users", "users")
      .where("thread.id = :threadId", { threadId })
      .getOne();

    if (!thread) {
      throw new NotFoundException("Thread not found");
    }

    const isParticipant = thread.users.some((user) => user.id === userId);
    if (!isParticipant) {
      throw new ForbiddenException("You do not have access to this thread");
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
    // Add user verification if used like in findAll
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
