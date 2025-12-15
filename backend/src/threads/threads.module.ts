import { Module } from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { ThreadsController } from "./threads.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Thread } from "./entities/thread.entity";
import { User } from "../users/entities/user.entity";
import { Message } from "../messages/entities/message.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Thread, User, Message])],
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}
