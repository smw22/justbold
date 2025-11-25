import { Faker } from "@faker-js/faker";
import { Genre } from "../../genres/entities/genre.entity";
import { setSeederFactory } from "typeorm-extension";

export const GenreFactory = setSeederFactory(Genre, (faker: Faker) => {
  const genre = new Genre();
  genre.title = "";
  return genre;
});
