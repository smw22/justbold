import { Faker } from "@faker-js/faker";
import { Collaboration } from "../../collaborations/entities/collaboration.entity";
import { setSeederFactory } from "typeorm-extension";

export const CollaborationFactory = setSeederFactory(Collaboration, (faker: Faker) => {
  const collaboration = new Collaboration();

  /**
   * Data that will be seeded in the seeder file
   * - User
   * - Genres
   * - Tags
   * - Skills
   */

  collaboration.media = faker.image.url();
  collaboration.title = faker.lorem.sentence();
  collaboration.content = faker.lorem.sentence({ min: 3, max: 10 });

  collaboration.role = faker.helpers.arrayElement([
    "Guitar",
    "Bass Guitar",
    "Violin",
    "Ukulele",
    "Saxophone",
    "Trumpet",
    "Dums",
    "Piano",
    "Synth",
    "Vocals",
  ]);

  collaboration.paid = faker.commerce.price({ min: 10, max: 1000 }) === "1";
  collaboration.location = faker.location.city();
  collaboration.created = faker.date.recent();

  return collaboration;
});
