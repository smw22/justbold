import { Faker } from "@faker-js/faker";
import { Message } from "../../messages/entities/message.entity";
import { setSeederFactory } from "typeorm-extension";

export const MessageFactory = setSeederFactory(Message, (faker: Faker) => {
  const message = new Message();
  message.content = faker.lorem.sentences(faker.number.int({ min: 1, max: 5 }));
  message.created = faker.date.past();
  return message;
});
