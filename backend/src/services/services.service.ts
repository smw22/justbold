import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Service } from "./entities/service.entity";
import { User } from "../users/entities/user.entity";
import { Tag } from "../tags/entities/tag.entity";
import { Review } from "../reviews/entities/review.entity";

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    // Fetch the User entity
    // This can be used for authentication/authorization checks in the future
    const user = await this.usersRepository.findOne({
      where: { id: createServiceDto.user_id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createServiceDto.user_id} not found`);
    }

    // Fetch the Tag entity
    const tag = await this.tagsRepository.findOne({
      where: { id: createServiceDto.tag_id },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${createServiceDto.tag_id} not found`);
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

  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    services: Service[];
    total: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    const [services, total] = await this.servicesRepository.findAndCount({
      relations: ["user", "tag"],
      order: { created: "DESC" },
      take: limit,
      skip: skip, // OFFSET
    });

    const totalPages = Math.ceil(total / limit);

    return {
      services,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async findOne(id: string): Promise<Service> {
    const serviceData = await this.servicesRepository.findOneBy({ id });
    if (!serviceData) {
      throw new HttpException("Service not found", 404);
    }
    return serviceData;
  }

  async findServiceReviews(id: string): Promise<{ reviews: Review[]; avg_rating: number }> {
    const [data, count] = await this.reviewsRepository.findAndCount({
      where: { object_id: id, type: "service" },
      relations: ["sender"], // Only include existing relations
    });

    if (count === 0) {
      return { reviews: [], avg_rating: 0 };
    }

    const avg_rating = data.reduce((sum: number, review: Review) => sum + review.rating, 0) / count;
    return { reviews: data, avg_rating };
  }

  async searchByTitle(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    services: Service[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const search = (query ?? "").trim();
    const skip = (page - 1) * limit;

    // If empty query, return all services
    if (!search) {
      return this.findAll(page, limit);
    }

    // % wildcard for partial matching (it searches everything that contains the term)
    const searchTerm = `%${search}%`;

    // Using QueryBuilder (more flexible than find())
    const qb = this.servicesRepository
      .createQueryBuilder("service")
      .leftJoinAndSelect("service.user", "user")
      .leftJoinAndSelect("service.tag", "tag")
      .where("service.title LIKE :searchTerm", { searchTerm })
      .orderBy("service.created", "DESC")
      .skip(skip)
      .take(limit);

    const [services, total] = await qb.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      services,
      total,
      page,
      totalPages,
    };
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const existingService = await this.servicesRepository.findOneBy({ id });
    if (!existingService) {
      throw new HttpException("Service not found", 404);
    }
    const serviceData = this.servicesRepository.merge(existingService, updateServiceDto);
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
