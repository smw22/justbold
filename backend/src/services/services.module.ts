import { Module } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { ServicesController } from "./services.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Service } from "./entities/service.entity";
import { User } from "../users/entities/user.entity";
import { Tag } from "../tags/entities/tag.entity";
import { Review } from "src/reviews/entities/review.entity";
@Module({
  imports: [TypeOrmModule.forFeature([Service, User, Tag, Review])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
