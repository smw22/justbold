import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

// Entities
import { User } from "../../users/entities/user.entity";
import { Post } from "../../posts/entities/post.entity";
import { Tag } from "../../tags/entities/tag.entity";
import { Genre } from "../../genres/entities/genre.entity";
import { Collaboration } from "../../collaborations/entities/collaboration.entity";
import { Service } from "../../services/entities/service.entity";
import { Review } from "../../reviews/entities/review.entity";

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    // Seed users
    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(10);

    // Seed tags
    const TagFactory = factoryManager.get(Tag);
    await TagFactory.saveMany(100);

    // Seed Genres
    const GenreFactory = factoryManager.get(Genre);
    const genreTitles = [
      "Rock",
      "Pop",
      "Jazz",
      "Classical",
      "Hip Hop",
      "Electronic",
      "Country",
      "Reggae",
      "Blues",
      "Metal",
      "R&B",
      "Funk",
      "Soul",
      "Punk",
      "Folk",
      "Disco",
      "Gospel",
      "Latin",
      "Ska",
      "House",
    ];
    const genres = await Promise.all(genreTitles.map((title: string) => GenreFactory.make({ title })));
    await dataSource.getRepository(Genre).save(genres);

    // Seed posts, each linked to a random user
    const postFactory = factoryManager.get(Post);
    const tags = await dataSource.getRepository(Tag).find();
    const posts = await Promise.all(
      Array(100)
        .fill("")
        .map(async () => {
          const user = faker.helpers.arrayElement(users);
          const postTags = faker.helpers.arrayElements(tags, {
            min: 1,
            max: 5,
          });
          return postFactory.make({ user, tags: postTags }); // Use tag entities directly
        })
    );
    await dataSource.getRepository(Post).save(posts);

    // Seed collaborations, each linked to a random user
    const collaborationFactory = factoryManager.get(Collaboration);
    const collaborations = await Promise.all(
      Array(50)
        .fill("")
        .map(async () => {
          const user = faker.helpers.arrayElement(users);
          const collaboration = await collaborationFactory.make({ user });

          // Assign random genres
          const randomGenres = faker.helpers.arrayElements(genres, {
            min: 1,
            max: 3,
          });
          collaboration.genres = randomGenres;

          // Assign random tags
          const randomTags = faker.helpers.arrayElements(tags, {
            min: 1,
            max: 5,
          });
          collaboration.tags = randomTags; // Use tag entities directly

          return collaboration;
        })
    );
    await dataSource.getRepository(Collaboration).save(collaborations);

    // seed services, each linked to a random user and tag
    const serviceFactory = factoryManager.get(Service);
    const services = await Promise.all(
      Array(50)
        .fill("")
        .map(async () => {
          const user = faker.helpers.arrayElement(users);
          const tag = faker.helpers.arrayElement(tags);
          return serviceFactory.make({ user, tag });
        })
    );
    await dataSource.getRepository(Service).save(services);

    // Seed reviews for services, each linked to a random user and service
    const reviewFactory = factoryManager.get(Review);
    const serviceReviews = await Promise.all(
      Array(100)
        .fill("")
        .map(async () => {
          const sender = faker.helpers.arrayElement(users);
          const service = faker.helpers.arrayElement(services);
          return reviewFactory.make({
            sender,
            type: "service",
            object_id: service.id,
          });
        })
    );
    const userReviews = await Promise.all(
      Array(100)
        .fill("")
        .map(async () => {
          const sender = faker.helpers.arrayElement(users);
          const user = faker.helpers.arrayElement(users);
          return reviewFactory.make({
            sender,
            type: "user",
            object_id: user.id,
          });
        })
    );
    await dataSource.getRepository(Review).save(serviceReviews);
    await dataSource.getRepository(Review).save(userReviews);
  }
}
