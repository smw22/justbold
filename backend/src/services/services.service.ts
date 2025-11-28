import { HttpException, Injectable } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Service } from "./entities/service.entity";

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const serviceData = await this.servicesRepository.create(createServiceDto);
    return this.servicesRepository.save(serviceData);
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
