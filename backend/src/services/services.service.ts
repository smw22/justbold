import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Service } from "./entities/service.entity";
import { User } from "src/users/entities/user.entity";
import { Tag } from "src/tags/entities/tag.entity";

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    // Fetch the User entity
    // This can be used for authentication/authorization checks in the future
    const user = await this.usersRepository.findOne({
      where: { id: createServiceDto.user_id },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createServiceDto.user_id} not found`
      );
    }

    // Fetch the Tag entity
    const tag = await this.tagsRepository.findOne({
      where: { id: createServiceDto.tag_id },
    });

    if (!tag) {
      throw new NotFoundException(
        `Tag with ID ${createServiceDto.tag_id} not found`
      );
    }

    // Create service with entity references (not IDs)
    const service = this.servicesRepository.create({
      title: createServiceDto.title,
      media: createServiceDto.media,
      content: createServiceDto.content,
      price: createServiceDto.price,
      location: createServiceDto.location,
      user, // User entity object { id: "uuid", name: "John", ... }
      tag, // Tag entity object { id: "uuid", title: "recording" }
    });
    // TypeORM extracts user.id and tag.id to populate user_id and tag_id columns

    return this.servicesRepository.save(service);
  }

  async findAll(): Promise<Service[]> {
    return await this.servicesRepository.find();
  }

  async findOne(id: string): Promise<Service> {
    const serviceData = await this.servicesRepository.findOneBy({ id });
    if (!serviceData) {
      throw new HttpException("Service not found", 404);
    }
    return serviceData;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto
  ): Promise<Service> {
    const existingService = await this.servicesRepository.findOneBy({ id });
    if (!existingService) {
      throw new HttpException("Service not found", 404);
    }
    const serviceData = this.servicesRepository.merge(
      existingService,
      updateServiceDto
    );
    return await this.servicesRepository.save(serviceData);
  }

  async remove(id: string): Promise<Service> {
    const existingService = await this.servicesRepository.findOneBy({ id });
    if (!existingService) {
      throw new HttpException("Service not found", 404);
    }
    return await this.servicesRepository.remove(existingService);
  }
}
