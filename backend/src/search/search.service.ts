import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Collaboration } from "../collaborations/entities/collaboration.entity";
import { Service } from "../services/entities/service.entity";
import { Tag } from "../tags/entities/tag.entity";
import { Post } from "../posts/entities/post.entity";
import { SearchQueryDto, SearchCategory } from "./dto/search-query-dto";

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Collaboration)
    private readonly collaborationsRepository: Repository<Collaboration>,
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>
  ) {}

  async search(searchQueryDto: SearchQueryDto) {
    const { query, category = SearchCategory.ALL, page = 1, limit = 10 } = searchQueryDto;

    // If no search query, return empty arrays
    if (!query || query.trim() === "") {
      return {
        people: [],
        collaborations: [],
        services: [],
        tags: [],
        posts: [],
      };
    }

    const searchTerm = `%${query}%`;
    const skip = (page - 1) * limit;

    switch (category) {
      case SearchCategory.PEOPLE:
        return { people: await this.searchPeople(searchTerm, skip, limit) };

      case SearchCategory.COLLABORATIONS:
        return { collaborations: await this.searchCollaborations(searchTerm, skip, limit) };

      case SearchCategory.SERVICES:
        return { services: await this.searchServices(searchTerm, skip, limit) };

      case SearchCategory.TAGS:
        return await this.searchTags(searchTerm, skip, limit);

      case SearchCategory.ALL:
      default:
        return {
          people: await this.searchPeople(searchTerm, 0, 5), // Only 5 results per category
          collaborations: await this.searchCollaborations(searchTerm, 0, 5),
          services: await this.searchServices(searchTerm, 0, 5),
          tags: await this.searchTags(searchTerm, 0, 5),
          posts: await this.searchPosts(searchTerm, 0, 5),
        };
    }
  }

  private async searchPeople(searchTerm: string, skip: number, limit: number) {
    return this.usersRepository.find({
      where: [{ name: ILike(searchTerm) }, { location: ILike(searchTerm) }, { user_type: ILike(searchTerm) }],
      take: limit,
      skip,
      select: ["id", "name", "profile_image", "location"],
    });
  }

  private async searchCollaborations(searchTerm: string, skip: number, limit: number) {
    return this.collaborationsRepository.find({
      where: [{ title: ILike(searchTerm) }, { content: ILike(searchTerm) }, { location: ILike(searchTerm) }],
      relations: ["user", "tags", "genres"],
      take: limit,
      skip,
    });
  }

  private async searchServices(searchTerm: string, skip: number, limit: number) {
    return this.servicesRepository.find({
      where: [{ title: ILike(searchTerm) }, { content: ILike(searchTerm) }, { location: ILike(searchTerm) }],
      relations: ["user", "tag"],
      take: limit,
      skip,
    });
  }

  private async searchTags(searchTerm: string, skip: number, limit: number) {
    const tags = await this.tagsRepository.find({
      where: { title: ILike(searchTerm) },
      select: ["id", "title"],
    });

    if (tags.length === 0) {
      return { tags: [], collaborations: [], posts: [] };
    }

    const tagIds = tags.map((tag) => tag.id);

    // Find collaborations with these tags
    const collaborations = await this.collaborationsRepository
      .createQueryBuilder("collaboration")
      .leftJoinAndSelect("collaboration.user", "user")
      .leftJoinAndSelect("collaboration.tags", "tags")
      .leftJoinAndSelect("collaboration.genres", "genres")
      .where("tags.id IN (:...tagIds)", { tagIds })
      .take(limit)
      .skip(skip)
      .getMany();

    // Find posts with these tags
    const posts = await this.postsRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("post.tags", "tags")
      .where("tags.id IN (:...tagIds)", { tagIds })
      .take(limit)
      .skip(skip)
      .getMany();

    return {
      tags,
      collaborations,
      posts,
    };
  }

  private async searchPosts(searchTerm: string, skip: number, limit: number) {
    return this.postsRepository.find({
      where: [{ title: ILike(searchTerm) }, { content: ILike(searchTerm) }],
      relations: ["user", "tags"],
      take: limit,
      skip,
    });
  }
}
