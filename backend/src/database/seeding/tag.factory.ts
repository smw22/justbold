import { Faker } from "@faker-js/faker";
import { Tag } from "../../tags/entities/tag.entity";
import { setSeederFactory } from "typeorm-extension";

const usedTagTitles = new Set<string>();

export const TagFactory = setSeederFactory(Tag, (faker: Faker) => {
  const tag = new Tag();
  let word: string;
  let attempts = 0;
  do {
    word = faker.lorem.word();
    attempts++;
    if (attempts > 20) break; // avoid infinite loop
  } while (usedTagTitles.has(word));
  usedTagTitles.add(word);
  tag.title = word;
  return tag;
});
