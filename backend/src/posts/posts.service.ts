import { Injectable, HttpException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { Tag } from "../tags/entities/tag.entity";
import { Like } from "../likes/entities/like.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>
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
      relations: ["tags", "likes", "likes.user", "user"],
    });

    const transformedData: any[] = [];
    for (const post of data) {
      const { user, likes, ...rest } = post;
      transformedData.push({
        ...rest,
        user: user
          ? {
              id: user.id,
              name: user.name,
              profile_image: user.profile_image,
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
        })),
      });
    }

    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<any> {
    const postData = await this.postsRepository.findOne({
      where: { id },
      relations: ["tags", "likes", "likes.user", "user"],
    });
    if (!postData) {
      throw new HttpException("Post not found", 404);
    }
    // Transform user object to only include name and profile_image
    const { user, likes, ...rest } = postData;
    return {
      ...rest,
      user: {
        id: user.id,
        name: user.name,
        profile_image: user.profile_image,
      },
      likes: likes.map((like) => ({
        user: like.user
          ? {
              id: like.user.id,
              name: like.user.name,
              profile_image: like.user.profile_image,
            }
          : null,
      })),
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
