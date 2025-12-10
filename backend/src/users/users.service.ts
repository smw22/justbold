import { Injectable, HttpException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Post } from "../posts/entities/post.entity";
import { Review } from "../reviews/entities/review.entity";
import { Question } from "../questions/entities/question.entity";
import { Like } from "../likes/entities/like.entity";

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
    private readonly reviewsRepository: Repository<Review>,
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>
  ) {}

  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  async findCurrent(): Promise<User[]> {
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

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingPost = await this.usersRepository.findOneBy({ id });
    if (!existingPost) {
      throw new HttpException("Post not found", 404);
    }
    const userData = this.usersRepository.merge(existingPost, updateUserDto);
    return await this.usersRepository.save(userData);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserPosts(id: string) {
    const posts = await this.postsRepository.find({
      where: { user: { id } },
      relations: ["user", "tags", "comments", "comments.user"], // Remove likes from relations
    });

    const transformedPosts = await Promise.all(
      posts.map(async (post) => {
        const likes = await this.likesRepository.find({
          where: { type: "post", object_id: post.id },
          relations: ["user"],
        });
        return {
          ...post,
          user: post.user
            ? {
                id: post.user.id,
                name: post.user.name,
                profile_image: post.user.profile_image,
              }
            : null,
          likes: likes.map((like) => ({
            user: like.user
              ? {
                  id: like.user.id,
                  name: like.user.name,
                  profile_image: like.user.profile_image,
                }
              : null,
            type: like.type,
          })),
          comments: (Array.isArray(post.comments) ? post.comments : []).map((comment) => ({
            id: comment.id,
            content: comment.content,
            created: comment.created,
            user: comment.user
              ? {
                  id: comment.user.id,
                  name: comment.user.name,
                  profile_image: comment.user.profile_image,
                }
              : null,
          })),
        };
      })
    );

    return {
      data: transformedPosts,
      total_posts: transformedPosts.length,
    };
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
    const [data, count] = await this.reviewsRepository.findAndCount({
      where: { object_id: id, type: "user" },
      relations: ["sender"], // Only include existing relations
    });

    if (count === 0) {
      throw new HttpException("No reviews found", 404);
    }

    // calculate avg_rating based on data and count.
    const avg_rating = data.reduce((sum, review) => sum + review.rating, 0) / count;

    // return data and avg_rating as json.
    return { data, avg_rating };
  }

  async findUserQuestions(id: string) {
    return await this.questionsRepository.find({ where: { user: { id } } });
  }
}
