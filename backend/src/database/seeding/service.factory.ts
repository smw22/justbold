import { Faker } from "@faker-js/faker";
import { Service } from "../../services/entities/service.entity";
import { setSeederFactory } from "typeorm-extension";

export const ServiceFactory = setSeederFactory(Service, (faker: Faker) => {
  const service = new Service();
  service.title = faker.lorem.words(3);
  service.content = faker.lorem.sentence({ min: 3, max: 10 });
  service.price = parseFloat(faker.commerce.price(10, 500, 2));
  service.media = faker.image.url();
  service.location = faker.address.city();
  service.category = faker.helpers.arrayElement([
    "art",
    "recording",
    "rehearsal_space",
    "music_lessons",
    "instrument_rental",
    "mixing",
    "mastering",
    "songwriting",
    "music_production",
    "dj_services",
    "band_booking",
    "music_promotion",
    "sheet_music",
    "music_arrangement",
    "studio_musician",
    "audio_editing",
    "voice_over",
    "music_composition",
  ]);
  service.created = faker.date.recent();
  service.updated = faker.date.recent();
  return service;
});
