import { Injectable, HttpException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { Tag } from "../tags/entities/tag.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>
  ) {}

  async create(CreatePostDto: CreatePostDto) {
    const postData = await this.postsRepository.create(CreatePostDto);
    return this.postsRepository.save(postData);
  }

  async findAll(page = 1, limit = 10): Promise<{ data: any[]; total: number }> {
    const [data, total] = await this.postsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created: "DESC" },
    });
    const tags = await this.tagsRepository.find();
    const tagMap = new Map(tags.map((tag) => [tag.id, tag]));
    const postsWithTags = data.map((post) => ({
      ...post,
      tags: post.tags.map((tagId) => tagMap.get(tagId)).filter(Boolean),
    }));
    return { data: postsWithTags, total };
  }

  async findOne(id: string): Promise<any> {
    const postData = await this.postsRepository.findOneBy({ id });
    if (!postData) {
      throw new HttpException("Post not found", 404);
    }
    const tags = await this.tagsRepository.find();
    const tagMap = new Map(tags.map((tag) => [tag.id, tag]));
    return {
      ...postData,
      tags: postData.tags.map((tagId) => tagMap.get(tagId)).filter(Boolean),
    };
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
