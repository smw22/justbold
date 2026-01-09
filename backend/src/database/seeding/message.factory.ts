import { Faker } from "@faker-js/faker";
import { Message } from "../../messages/entities/message.entity";
import { setSeederFactory } from "typeorm-extension";

export const MessageFactory = setSeederFactory(Message, (faker: Faker) => {
  const message = new Message();
  message.content = faker.lorem.sentence({ min: 3, max: 10 });
  message.created = faker.date.past();
  return message;
});
