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

  async findAll(page = 1, limit = 10, userId?: string): Promise<{ data: any[]; total: number }> {
    const [data, total] = await this.postsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created: "DESC" },
      relations: ["tags", "user", "comments", "comments.user", "comments.parent"],
    });

    const transformedData: any[] = [];
    for (const post of data) {
      // Fetch likes for this post
      const likes = await this.likesRepository.find({ where: { type: "post", object_id: post.id }, relations: ["user"] });
      // Check if current user has liked the post
      let likedByCurrentUser = false;
      if (userId) {
        likedByCurrentUser = !!(await this.likesRepository.findOne({
          where: {
            type: "post",
            object_id: post.id,
            user: { id: userId },
          },
          relations: ["user"],
        }));
      }
      const totalLikes = likes.length;
      const { user, comments = [], ...rest } = post as any;
      const commentsWithLikes = await Promise.all(
        comments.map(async (comment: any) => {
          const commentLikes = await this.likesRepository.find({
            where: { type: "comment", object_id: comment.id },
            relations: ["user"],
          });
          let commentLikedByCurrentUser = false;
          if (userId) {
            commentLikedByCurrentUser = !!commentLikes.find((like) => like.user?.id === userId);
          }
          return {
            id: comment.id,
            parentId: comment.parent ? comment.parent.id : null,
            content: comment.content,
            created: comment.created,
            user: comment.user
              ? {
                  id: comment.user.id,
                  name: comment.user.name,
                  profile_image: comment.user.profile_image,
                }
              : null,
            likeCount: commentLikes.length,
            likedByCurrentUser: commentLikedByCurrentUser,
          };
        })
      );
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
        comments: commentsWithLikes,
        totalLikes,
        likedByCurrentUser,
      });
    }

    return { data: transformedData, total };
  }

  async findOne(id: string, userId?: string): Promise<any> {
    const postData = await this.postsRepository.findOne({
      where: { id },
      relations: ["tags", "user", "comments", "comments.user", "comments.parent"],
    });
    if (!postData) {
      throw new HttpException("Post not found", 404);
    }
    // Fetch likes for this post
    const likes = await this.likesRepository.find({ where: { type: "post", object_id: postData.id }, relations: ["user"] });
    // Check if current user has liked the post
    let likedByCurrentUser = false;
    if (userId) {
      likedByCurrentUser = !!(await this.likesRepository.findOne({
        where: {
          type: "post",
          object_id: postData.id,
          user: { id: userId },
        },
        relations: ["user"],
      }));
    }
    const totalLikes = likes.length;
    // Fetch likes for each comment

    const commentsWithLikes = await Promise.all(
      (postData.comments || []).map(async (comment: Comment) => {
        const commentLikes = await this.likesRepository.find({
          where: { type: "comment", object_id: comment.id },
          relations: ["user"],
        });
        let commentLikedByCurrentUser = false;
        if (userId) {
          commentLikedByCurrentUser = !!commentLikes.find((like) => like.user?.id === userId);
        }
        return {
          id: comment.id,
          parentId: comment.parent ? comment.parent.id : null,
          content: comment.content,
          created: comment.created,
          user: comment.user
            ? {
                id: comment.user.id,
                name: comment.user.name,
                profile_image: comment.user.profile_image,
              }
            : null,
          likeCount: commentLikes.length,
          likedByCurrentUser: commentLikedByCurrentUser,
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
      totalLikes,
      likedByCurrentUser,
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

  async getLikes(postId: string): Promise<Like[]> {
    return this.likesRepository.find({ where: { type: "post", object_id: postId }, relations: ["user"] });
  }

  async addLike(postId: string, userId: string): Promise<Like> {
    // Check if like already exists
    const existingLike = await this.likesRepository.findOne({
      where: {
        type: "post",
        object_id: postId,
        user: { id: userId },
      },
      relations: ["user"],
    });
    if (existingLike) {
      throw new HttpException("User has already liked this post", 400);
    }
    const likeData = this.likesRepository.create({
      type: "post",
      object_id: postId,
      user: { id: userId },
    });
    return this.likesRepository.save(likeData);
  }

  async removeLike(postId: string, userId: string): Promise<void> {
    const existingLike = await this.likesRepository.findOne({
      where: {
        type: "post",
        object_id: postId,
        user: { id: userId },
      },
      relations: ["user"],
    });
    if (!existingLike) {
      throw new HttpException("Like not found", 404);
    }
    await this.likesRepository.remove(existingLike);
  }

  async addComment(postId: string, userId: string, content: string, parentId?: string): Promise<Comment> {
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new HttpException("Post not found", 404);
    }
    const commentData = this.commentsRepository.create({
      content,
      post: { id: postId },
      user: { id: userId },
      parent: parentId ? { id: parentId } : undefined,
    });
    return this.commentsRepository.save(commentData);
  }
}
