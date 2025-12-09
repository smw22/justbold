import { Faker } from "@faker-js/faker";
import { Comment } from "../../comments/entities/comment.entity";
import { setSeederFactory } from "typeorm-extension";

export const CommentFactory = setSeederFactory(Comment, (faker: Faker) => {
  const comment = new Comment();
  comment.content = faker.lorem.sentence();
  comment.created = faker.date.past();
  return comment;
});
