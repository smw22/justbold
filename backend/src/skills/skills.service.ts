import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Skill } from "./entities/skill.entity";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const existingSkill = await this.skillsRepository.findOneBy({
      title: createSkillDto.title,
    });
    if (existingSkill) {
      throw new HttpException("Skill already exists", 400);
    }
    const skill = this.skillsRepository.create(createSkillDto);
    return this.skillsRepository.save(skill);
  }

  async findAll(): Promise<Skill[]> {
    return this.skillsRepository.find();
  }

  async findOne(title: string): Promise<Skill> {
    const skillData = await this.skillsRepository.findOneBy({
      title: title,
    });
    if (!skillData) {
      throw new HttpException("Skill not found", 404);
    }
    return skillData;
  }

  async update(title: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const existingSkill = await this.skillsRepository.findOneBy({
      title: title,
    });
    if (!existingSkill) {
      throw new HttpException("Skill not found", 404);
    }
    const skillData = this.skillsRepository.merge(existingSkill, updateSkillDto);
    return this.skillsRepository.save(skillData);
  }

  async remove(title: string): Promise<Skill> {
    const existingSkill = await this.skillsRepository.findOneBy({
      title: title,
    });
    if (!existingSkill) {
      throw new HttpException("Skill not found", 404);
    }
    return this.skillsRepository.remove(existingSkill);
  }
}
