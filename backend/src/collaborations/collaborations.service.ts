import { Injectable, HttpException } from "@nestjs/common";
import { CreateCollaborationDto } from "./dto/create-collaboration.dto";
import { UpdateCollaborationDto } from "./dto/update-collaboration.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Collaboration } from "./entities/collaboration.entity";
import { Genre } from "../genres/entities/genre.entity";
import { Tag } from "../tags/entities/tag.entity";
import { Skill } from "../skills/entities/skill.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class CollaborationsService {
  constructor(
    @InjectRepository(Collaboration)
    private readonly collaborationRepository: Repository<Collaboration>,
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(createCollaborationDto: CreateCollaborationDto, userId: string): Promise<Collaboration> {
    const genres = createCollaborationDto.genreIds
      ? await this.genresRepository.findByIds(createCollaborationDto.genreIds)
      : [];
    const tags = createCollaborationDto.tagIds ? await this.tagsRepository.findByIds(createCollaborationDto.tagIds) : [];
    const skills = createCollaborationDto.skillIds
      ? await this.skillsRepository.findByIds(createCollaborationDto.skillIds)
      : [];
    const users = createCollaborationDto.userIds ? await this.usersRepository.findByIds(createCollaborationDto.userIds) : [];

    const collabData = this.collaborationRepository.create({
      ...createCollaborationDto,
      user: { id: userId },
      genres,
      tags,
      skills,
      users,
    });
    return await this.collaborationRepository.save(collabData);
  }

  async findAll(
    page = 1,
    limit = 10,
    genre = "",
    orderBy = "created",
    tags: string[] = []
  ): Promise<{ data: Collaboration[] }> {
    const query = this.collaborationRepository.createQueryBuilder("collaboration");

    if (genre) {
      query
        .innerJoin("collaboration.genres", "genreFilter", "genreFilter.title = :genre", { genre })
        .leftJoinAndSelect("collaboration.genres", "genre")
        .distinct(true);
    } else {
      query.leftJoinAndSelect("collaboration.genres", "genre");
    }

    // Add user data
    query.leftJoinAndSelect("collaboration.user", "user");

    // Add users (members) data
    query.leftJoinAndSelect("collaboration.users", "collaborationUsers");

    // Add tags join
    query.leftJoinAndSelect("collaboration.tags", "tag");

    // add skills join
    query.leftJoinAndSelect("collaboration.skills", "skill");

    // Filter by tags if provided
    if (tags.length > 0) {
      query.andWhere("tag.title IN (:...tags)", { tags });
    }

    query
      .orderBy(`collaboration.${orderBy}`, "DESC")
      .skip((page - 1) * limit)
      .take(limit);

    const data = await query.getMany();

    return { data };
  }

  async findOne(id: string): Promise<Collaboration> {
    const collabData = await this.collaborationRepository.findOne({
      where: { id },
      relations: ["user", "users"],
    });
    if (!collabData) {
      throw new HttpException("Collaboration not found", 404);
    }
    return collabData;
  }

  async update(id: string, updateCollaborationDto: UpdateCollaborationDto): Promise<Collaboration> {
    if (!updateCollaborationDto || Object.keys(updateCollaborationDto).length === 0) {
      throw new HttpException("No update values provided", 400);
    }
    const existingCollab = await this.collaborationRepository.findOneBy({ id });
    if (!existingCollab) {
      throw new HttpException("Collaboration not found", 404);
    }
    const collabData = this.collaborationRepository.merge(existingCollab, updateCollaborationDto);
    return await this.collaborationRepository.save(collabData);
  }

  async remove(id: string) {
    const existingCollab = await this.collaborationRepository.findOneBy({ id });
    if (!existingCollab) {
      throw new HttpException("Collaboration not found", 404);
    }
    return await this.collaborationRepository.remove(existingCollab);
  }
}
