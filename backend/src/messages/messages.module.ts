import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { Message } from "./entities/message.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Thread } from "../threads/entities/thread.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Thread])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
