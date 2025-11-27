import { Injectable, HttpException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Post } from "../posts/entities/post.entity";
import { Review } from "src/reviews/entities/review.entity";

@Injectable()
export class UsersService {
  constructor(
    // This comes from entities imported by users.module.ts and injected into this service as repositories.
    // What it does is create a way to call database method "find()", "findOne()" etc. for each of the entities.
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Review)
    private readonly reviewsReposity: Repository<Review>
  ) {}

  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const userData = await this.usersRepository.findOne({
      where: { id },
    });

    if (!userData) {
      throw new HttpException("User not found", 404);
    }

    return userData;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserPosts(id: string) {
    return await this.postsRepository.findAndCount({ where: { user: { id } } });
  }

  async findUserReviews(id: string) {
    // "id: string" comes from users.controller.ts, and is a param.
    // users.controller.ts calls this function that is inside the UsersService class - this.usersService.findUserReviews()
    // And that's where it passes the id param.

    // EXPLANATION OF THE FIRST LINE:
    // "this" relates to UsersService - the whole class.
    // "reviewsRepository" relates to an object that can call methods like "findAndCount()".
    // "findAndCount()" is one of the built-in methods in TypeORM.
    // the function returns an array with exactly 2 values - data and count.
    const [data, count] = await this.reviewsReposity.findAndCount({
      // user is one of the column names that was defined inside review.entity.ts.
      // You know, like this:
      //   @Column()
      //   user: User;
      where: { user: { id } },
      relations: ["sender", "service"], // Add relations here
    });

    if (count === 0) {
      throw new HttpException("No reviews found", 404);
    }

    // calculate avg_rating based on data and count.
    const avg_rating = data.reduce((sum, review) => sum + review.rating, 0) / count;

    // return data and avg_rating as json.
    return { data, avg_rating };
  }
}
