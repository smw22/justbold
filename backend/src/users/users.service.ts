import { Injectable, HttpException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Post } from "../posts/entities/post.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>
  ) {}

  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const postData = await this.usersRepository.findOneBy({ id });
    if (!postData) {
      throw new HttpException("Post not found", 404);
    }
    return postData;
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
}
