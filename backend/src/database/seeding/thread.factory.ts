import { Faker } from "@faker-js/faker";
import { Thread } from "../../threads/entities/thread.entity";
import { setSeederFactory } from "typeorm-extension";

export const ThreadFactory = setSeederFactory(Thread, (faker: Faker) => {
  const thread = new Thread();
  // You can add more properties to the thread as needed
  thread.created = faker.date.past();
  return thread;
});
