import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "./entities/user.entity";
import { Post } from "../posts/entities/post.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Question } from "src/questions/entities/question.entity";

// This is a module. It packages everything related to users together.
// The module is called by app.module.ts.
@Module({
  // IMPORTS EXPLANATION:
  // Think of it as "importing dependencies".
  // – You're saying "I need access to the User, Post, and Review database tables".

  // These three values are injected to the SERVICE/PROVIDER.
  // Like this:
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>,

  // Lets take "Review" as an example:
  // This line tells NestJS:
  // "Hey, I need a Repository for the Review entity".
  // This creates a Repository<Review> which is an object that has methods like "find()", "findOne()" etc.
  imports: [TypeOrmModule.forFeature([User, Post, Review, Question])],

  // CONTROLLERS EXPLANATION:
  // Controllers are route handlers.
  // They receive and return responses.
  // They handle incoming requests (GET, POST, PATCH etc.), and they also define API endpoints ('/users/:id').
  controllers: [UsersController],

  // PROVIDERS EXPLANATION:
  // This one is quite a bitch to understand.
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
