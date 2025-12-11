import { Faker } from "@faker-js/faker";
import { Like } from "../../likes/entities/like.entity";
import { setSeederFactory } from "typeorm-extension";

export const LikeFactory = setSeederFactory(Like, (faker: Faker) => {
  const like = new Like();
  like.created = faker.date.past();
  return like;
});
