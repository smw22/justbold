import { Faker } from "@faker-js/faker";
import { Service } from "../../services/entities/service.entity";
import { setSeederFactory } from "typeorm-extension";

export const ServiceFactory = setSeederFactory(Service, (faker: Faker) => {
  const service = new Service();
  service.title = faker.lorem.words(3);
  service.content = faker.lorem.paragraphs({ min: 1, max: 2 });
  service.price = parseFloat(faker.commerce.price(10, 500, 2));
  service.media = faker.image.url();
  service.location = faker.address.city();
  // user and tag will be set in the seeder
  service.created = faker.date.recent();
  service.updated = faker.date.recent();
  return service;
});
