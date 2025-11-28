import { Faker } from "@faker-js/faker";
import { Tag } from "../../tags/entities/tag.entity";
import { setSeederFactory } from "typeorm-extension";

export const TagFactory = setSeederFactory(Tag, (faker: Faker) => {
  const tag = new Tag();
  tag.title = faker.lorem.word();
  return tag;
});
