import { Injectable, HttpException } from "@nestjs/common";
import { CreateCollaborationDto } from "./dto/create-collaboration.dto";
import { UpdateCollaborationDto } from "./dto/update-collaboration.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Collaboration } from "./entities/collaboration.entity";

@Injectable()
export class CollaborationsService {
  constructor(
    @InjectRepository(Collaboration)
    private readonly collaborationRepository: Repository<Collaboration>
  ) {}

  async create(
    createCollaborationDto: CreateCollaborationDto
  ): Promise<Collaboration> {
    const collabData = await this.collaborationRepository.create(
      createCollaborationDto
    );
    return this.collaborationRepository.save(collabData);
  }

  async findAll(
    page = 1,
    limit = 10
  ): Promise<{ data: Collaboration[]; total: number }> {
    const [data, total] = await this.collaborationRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created: "DESC" },
    });
    return { data, total };
  }

  async findOne(id: string): Promise<Collaboration> {
    const collabData = await this.collaborationRepository.findOneBy({ id });
    if (!collabData) {
      throw new HttpException("Collaboration not found", 404);
    }
    return collabData;
  }

  async update(
    id: string,
    updateCollaborationDto: UpdateCollaborationDto
  ): Promise<Collaboration> {
    const existingCollab = await this.collaborationRepository.findOneBy({ id });
    if (!existingCollab) {
      throw new HttpException("Collaboration not found", 404);
    }
    const collabData = this.collaborationRepository.merge(
      existingCollab,
      updateCollaborationDto
    );
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
