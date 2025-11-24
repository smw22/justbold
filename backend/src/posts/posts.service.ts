import { Injectable, HttpException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>
  ) {}

  async create(CreatePostDto: CreatePostDto) {
    const postData = await this.postsRepository.create(CreatePostDto);
    return this.postsRepository.save(postData);
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async findOne(id: string): Promise<Post> {
    const postData = await this.postsRepository.findOneBy({ id });
    if (!postData) {
      throw new HttpException("Post not found", 404);
    }
    return postData;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const existingPost = await this.postsRepository.findOneBy({ id });
    if (!existingPost) {
      throw new HttpException("Post not found", 404);
    }
    const postData = this.postsRepository.merge(existingPost, updatePostDto);
    return await this.postsRepository.save(postData);
  }

  async remove(id: string): Promise<Post> {
    const existingPost = await this.postsRepository.findOneBy({ id });
    if (!existingPost) {
      throw new HttpException("Post not found", 404);
    }
    return await this.postsRepository.remove(existingPost);
  }
}
