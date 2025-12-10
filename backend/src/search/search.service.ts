import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, Not } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Collaboration } from "../collaborations/entities/collaboration.entity";
import { Service } from "../services/entities/service.entity";
import { Tag } from "../tags/entities/tag.entity";
import { Post } from "../posts/entities/post.entity";
import { SearchQueryDto, SearchCategory, SEARCH_DEFAULT_LIMIT } from "./dto/search-query-dto";

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

  private calculateLimitPerCategory(limit: number): number {
    return Math.floor(limit / 4);
  }

  async search(searchQueryDto: SearchQueryDto, currentUserId: string) {
    const { query, category = SearchCategory.ALL, page = 1, limit = SEARCH_DEFAULT_LIMIT } = searchQueryDto;
    const limitPerCategory = this.calculateLimitPerCategory(limit);

    // If no search query, return recent content
    if (!query || query.trim() === "") {
      // For all categories, divide by 4. For specific categories, return 8 results
      if (category === SearchCategory.ALL) {
        return this.getRecentResults(limit, currentUserId);
      } else {
        return this.getRecentResultsByCategory(category, SEARCH_DEFAULT_LIMIT, currentUserId);
      }
    }

    const searchTerm = `%${query}%`;
    const skip = (page - 1) * limit;

    switch (category) {
      case SearchCategory.PEOPLE:
        return { people: await this.searchPeople(searchTerm, skip, limit, currentUserId) };

      case SearchCategory.COLLABORATIONS:
        return { collaborations: await this.searchCollaborations(searchTerm, skip, limit) };

      case SearchCategory.SERVICES:
        return { services: await this.searchServices(searchTerm, skip, limit) };

      case SearchCategory.TAGS:
        return await this.searchTags(searchTerm, skip, limit);

      case SearchCategory.ALL:
      default:
        const collabByTitle = await this.searchCollaborations(searchTerm, 0, limitPerCategory);
        const postsByTitle = await this.searchPosts(searchTerm, 0, limitPerCategory);
        const tagResults = await this.searchTags(searchTerm, 0, limitPerCategory);

        // Merge collaborations and posts from both title search and tag search
        const allCollaborations = [
          ...collabByTitle,
          ...tagResults.collaborations.filter(
            (tagCollab: any) => !collabByTitle.some((titleCollab: any) => titleCollab.id === tagCollab.id)
            // Only add tag results that aren't already in title results (by checking ID)
          ),
        ].slice(0, limitPerCategory);

        const allPosts = [
          ...postsByTitle,
          ...tagResults.posts.filter((tagPost: any) => !postsByTitle.some((titlePost: any) => titlePost.id === tagPost.id)),
        ].slice(0, limitPerCategory);

        return {
          people: await this.searchPeople(searchTerm, 0, limitPerCategory, currentUserId),
          collaborations: allCollaborations,
          services: await this.searchServices(searchTerm, 0, limitPerCategory),
          tags: tagResults.tags,
          posts: allPosts,
        };
    }
  }

  private async searchPeople(searchTerm: string, skip: number, limit: number, currentUserId: string) {
    return this.usersRepository.find({
      where: [
        { name: ILike(searchTerm), id: Not(currentUserId) },
        { location: ILike(searchTerm), id: Not(currentUserId) },
        { user_type: ILike(searchTerm), id: Not(currentUserId) },
      ],
      take: limit,
      skip,
      select: ["id", "name", "profile_image", "location"],
    });
  }

  private async searchCollaborations(searchTerm: string, skip: number, limit: number) {
    return this.collaborationsRepository.find({
      where: [{ title: ILike(searchTerm) }, { location: ILike(searchTerm) }],
      relations: ["user", "tags", "genres"],
      take: limit,
      skip,
    });
  }

  private async searchServices(searchTerm: string, skip: number, limit: number) {
    return this.servicesRepository.find({
      where: [{ title: ILike(searchTerm) }, { location: ILike(searchTerm) }],
      relations: ["user"],
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
    const limitPerType = Math.floor(limit / 2);

    // Find collaborations with given tag
    const collaborations = await this.collaborationsRepository
      .createQueryBuilder("collaboration")
      .leftJoinAndSelect("collaboration.user", "user")
      .leftJoinAndSelect("collaboration.tags", "tags")
      .leftJoinAndSelect("collaboration.genres", "genres")
      .where("tags.id IN (:...tagIds)", { tagIds })
      .take(limitPerType)
      .skip(skip)
      .getMany();

    // Find posts with given tag
    const posts = await this.postsRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("post.tags", "tags")
      .where("tags.id IN (:...tagIds)", { tagIds })
      .take(limitPerType)
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
      where: [{ title: ILike(searchTerm) }],
      relations: ["user", "tags"],
      take: limit,
      skip,
    });
  }

  private async getRecentResults(limit: number, currentUserId: string) {
    const limitPerCategory = this.calculateLimitPerCategory(limit);

    const [people, collaborations, services, posts] = await Promise.all([
      this.usersRepository.find({
        where: { id: Not(currentUserId) },
        order: { created: "DESC" },
        take: limitPerCategory,
        select: ["id", "name", "profile_image", "location"],
      }),
      this.collaborationsRepository.find({
        order: { created: "DESC" },
        take: limitPerCategory,
        relations: ["user", "tags", "genres"],
      }),
      this.servicesRepository.find({
        order: { created: "DESC" },
        take: limitPerCategory,
        relations: ["user"],
      }),
      this.postsRepository.find({
        order: { created: "DESC" },
        take: limitPerCategory,
        relations: ["user", "tags"],
      }),
    ]);

    return {
      people,
      collaborations,
      services,
      posts,
    };
  }

  private async getRecentResultsByCategory(category: SearchCategory, limit: number, currentUserId: string) {
    switch (category) {
      case SearchCategory.PEOPLE:
        return {
          people: await this.usersRepository.find({
            where: { id: Not(currentUserId) },
            order: { created: "DESC" },
            take: limit,
            select: ["id", "name", "profile_image", "location"],
          }),
        };

      case SearchCategory.COLLABORATIONS:
        return {
          collaborations: await this.collaborationsRepository.find({
            order: { created: "DESC" },
            take: limit,
            relations: ["user", "tags", "genres"],
          }),
        };

      case SearchCategory.SERVICES:
        return {
          services: await this.servicesRepository.find({
            order: { created: "DESC" },
            take: limit,
            relations: ["user"],
          }),
        };

      case SearchCategory.TAGS:
        const limitPerCategory = Math.floor(limit / 2);
        const [collaborations, posts] = await Promise.all([
          this.collaborationsRepository.find({
            order: { created: "DESC" },
            take: limitPerCategory,
            relations: ["user", "tags", "genres"],
          }),
          this.postsRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.user", "user")
            .leftJoinAndSelect("post.tags", "tags")
            .orderBy("post.created", "DESC")
            .take(limitPerCategory)
            .getMany(),
        ]);
        return {
          tags: [],
          collaborations,
          posts,
        };

      default:
        return {};
    }
  }
}
