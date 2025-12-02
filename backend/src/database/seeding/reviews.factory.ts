import { Faker } from "@faker-js/faker";
import { Review } from "../../reviews/entities/review.entity";
import { setSeederFactory } from "typeorm-extension";

export const ReviewFactory = setSeederFactory(Review, (faker: Faker) => {
  const review = new Review();
  review.rating = faker.number.int({ min: 1, max: 5 });
  review.content = faker.lorem.paragraph();
  review.type = faker.helpers.arrayElement(["post", "service"]);
  review.object_id = faker.string.uuid();
  review.created = faker.date.past();
  return review;
});
