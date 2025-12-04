import { Faker } from "@faker-js/faker";
import { Skill } from "../../skills/entities/skill.entity";
import { setSeederFactory } from "typeorm-extension";

export const SkillFactory = setSeederFactory(Skill, (faker: Faker) => {
  const genre = new Skill();
  genre.title = "";
  return genre;
});
