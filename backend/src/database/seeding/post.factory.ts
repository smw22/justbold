import { Faker } from "@faker-js/faker";
import { Post } from "../../posts/entities/post.entity";
import { setSeederFactory } from "typeorm-extension";

export const PostFactory = setSeederFactory(Post, (faker: Faker) => {
  const post = new Post();
  post.title = faker.lorem.sentence();
  post.content = faker.lorem.sentence({ min: 3, max: 10 });

  // Tags will be set in the seeder
  //   post.tags = [faker.lorem.word(), faker.lorem.word()];
  post.media = faker.image.url();

  // user will be set in the seeder
  post.created = faker.date.recent();
  return post;
});
