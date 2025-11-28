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
    const [data, count] = await this.reviewsReposity.findAndCount({
      where: { user: { id } },
      relations: ["sender", "service"], // Add relations here
    });

    if (count === 0) {
      throw new HttpException("No reviews found", 404);
    }

    const avg_rating = data.reduce((sum, review) => sum + review.rating, 0) / count;

    return { data, avg_rating };
  }
}
