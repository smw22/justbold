import { Injectable, HttpException } from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "./entities/tag.entity";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const existingTag = await this.tagsRepository.findOneBy({
      title: createTagDto.title,
    });
    if (existingTag) {
      throw new HttpException("Tag already exists", 400);
    }
    const tag = await this.tagsRepository.create(createTagDto);
    return this.tagsRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async findOne(title: string): Promise<Tag> {
    const tagData = await this.tagsRepository.findOneBy({
      title: title,
    });
    if (!tagData) {
      throw new HttpException("Tag not found", 404);
    }

    return tagData;
  }

  async update(title: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const existingTag = await this.tagsRepository.findOneBy({
      title: title,
    });
    if (!existingTag) {
      throw new HttpException("Tag not found", 404);
    }
    const tagData = this.tagsRepository.merge(existingTag, updateTagDto);
    return this.tagsRepository.save(tagData);
  }

  async remove(title: string): Promise<Tag> {
    const existingTag = await this.tagsRepository.findOneBy({
      title: title,
    });
    if (!existingTag) {
      throw new HttpException("Tag not found", 404);
    }
    return this.tagsRepository.remove(existingTag);
  }
}
