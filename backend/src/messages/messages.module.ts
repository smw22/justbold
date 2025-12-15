import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { Message } from "./entities/message.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Thread } from "../threads/entities/thread.entity";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Thread, User])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
