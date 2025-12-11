import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Like } from "../likes/entities/like.entity";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>
  ) {}

  async addLike(commentId: string, userId: string) {
    const existingLike = await this.likesRepository.findOne({
      where: {
        type: "comment",
        object_id: commentId,
        user: { id: userId },
      },
      relations: ["user"],
    });
    if (existingLike) {
      throw new HttpException("User has already liked this comment", 400);
    }
    const likeData = this.likesRepository.create({
      type: "comment",
      object_id: commentId,
      user: { id: userId },
    });
    return this.likesRepository.save(likeData);
  }

  async removeLike(commentId: string, userId: string) {
    const existingLike = await this.likesRepository.findOne({
      where: {
        type: "comment",
        object_id: commentId,
        user: { id: userId },
      },
      relations: ["user"],
    });
    if (!existingLike) {
      throw new HttpException("Like not found", 404);
    }
    await this.likesRepository.remove(existingLike);
    return { commentId, userId };
  }

  async getLikes(commentId: string) {
    return this.likesRepository.find({
      where: { type: "comment", object_id: commentId },
      relations: ["user"],
    });
  }
}
