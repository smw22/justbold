import { Injectable, HttpException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { Tag } from "../tags/entities/tag.entity";
import { Like } from "../likes/entities/like.entity";
import { Comment } from "../comments/entities/comment.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>
  ) {}

  async create(CreatePostDto: CreatePostDto, userId: string) {
    const tags = CreatePostDto.tagIds ? await this.tagsRepository.findByIds(CreatePostDto.tagIds) : [];

    const postData = this.postsRepository.create({
      ...CreatePostDto,
      user: { id: userId },
      tags,
    });

    return this.postsRepository.save(postData);
  }

  async findAll(page = 1, limit = 10): Promise<{ data: any[]; total: number }> {
    const [data, total] = await this.postsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created: "DESC" },
      relations: ["tags", "user", "comments", "comments.user"],
    });

    const transformedData: any[] = [];
    for (const post of data) {
      // Fetch likes for this post
      const likes = await this.likesRepository.find({ where: { type: "post", object_id: post.id }, relations: ["user"] });
      const { user, comments = [], ...rest } = post as any;
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
          type: like.type,
        })),
        comments: comments.map((comment: any) => ({
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
      });
    }

    return { data: transformedData, total };
  }

  async findOne(id: string): Promise<any> {
    const postData = await this.postsRepository.findOne({
      where: { id },
      relations: ["tags", "user", "comments", "comments.user"], // Remove likes and likes.user
    });
    if (!postData) {
      throw new HttpException("Post not found", 404);
    }
    // Fetch likes for this post
    const likes = await this.likesRepository.find({ where: { type: "post", object_id: postData.id }, relations: ["user"] });
    // Fetch likes for each comment
    const commentsWithLikes = await Promise.all(
      (postData.comments || []).map(async (comment: Comment) => {
        const commentLikes = await this.likesRepository.find({
          where: { type: "comment", object_id: comment.id },
          relations: ["user"],
        });
        return {
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
          likes: commentLikes.map((like) => ({
            id: like.id,
            user: like.user
              ? {
                  name: like.user.name,
                  profile_image: like.user.profile_image,
                }
              : null,
            type: like.type,
          })),
        };
      })
    );
    const { user, comments = [], ...rest } = postData as any;
    return {
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
        type: like.type,
      })),
      comments: commentsWithLikes,
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
