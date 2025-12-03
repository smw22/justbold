import { Injectable, HttpException } from "@nestjs/common";
import { CreateCollaborationDto } from "./dto/create-collaboration.dto";
import { UpdateCollaborationDto } from "./dto/update-collaboration.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Collaboration } from "./entities/collaboration.entity";
import { DataSource } from "typeorm/browser";

@Injectable()
export class CollaborationsService {
  constructor(
    @InjectRepository(Collaboration)
    private readonly collaborationRepository: Repository<Collaboration>
  ) {}

  async create(createCollaborationDto: CreateCollaborationDto): Promise<Collaboration> {
    const collabData = await this.collaborationRepository.create(createCollaborationDto);
    return this.collaborationRepository.save(collabData);
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
    const collabData = await this.collaborationRepository.findOneBy({ id });
    if (!collabData) {
      throw new HttpException("Collaboration not found", 404);
    }
    return collabData;
  }

  async update(id: string, updateCollaborationDto: UpdateCollaborationDto): Promise<Collaboration> {
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
