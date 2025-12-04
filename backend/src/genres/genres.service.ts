import { Injectable, HttpException } from "@nestjs/common";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Genre } from "./entities/genre.entity";

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const existingGenre = await this.genresRepository.findOneBy({
      title: createGenreDto.title,
    });
    if (existingGenre) {
      throw new HttpException("Genre already exists", 400);
    }
    const genre = await this.genresRepository.create(createGenreDto);
    return this.genresRepository.save(genre);
  }

  async findAll(): Promise<Genre[]> {
    return this.genresRepository.find();
  }

  async findOne(title: string): Promise<Genre> {
    const genreData = await this.genresRepository.findOneBy({
      title: title,
    });
    if (!genreData) {
      throw new HttpException("Genre not found", 404);
    }
    return genreData;
  }

  async update(title: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const existingGenre = await this.genresRepository.findOneBy({
      title: title,
    });
    if (!existingGenre) {
      throw new HttpException("Genre not found", 404);
    }
    const genreData = this.genresRepository.merge(existingGenre, updateGenreDto);
    return this.genresRepository.save(genreData);
  }

  async remove(title: string): Promise<Genre> {
    const existingGenre = await this.genresRepository.findOneBy({
      title: title,
    });
    if (!existingGenre) {
      throw new HttpException("Genre not found", 404);
    }
    return this.genresRepository.remove(existingGenre);
  }
}
