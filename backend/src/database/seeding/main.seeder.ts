import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

// Entities
import { User } from "../../users/entities/user.entity";
import { Post } from "../../posts/entities/post.entity";
import { Tag } from "../../tags/entities/tag.entity";
import { Genre } from "../../genres/entities/genre.entity";
import { Collaboration } from "../../collaborations/entities/collaboration.entity";

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    // Seed users: always create one predefined user, then random users
    const userFactory = factoryManager.get(User);
    const predefinedUser = await userFactory.make({
      name: "Test User",
      email: "test@user.com",
      password: "admin",
      //   phone: "1234567890",
      //   year_of_birth: 1990,
      //   location: "Test City",
      //   theme: "header-bg-1",
      //   connections: [],
      //   subscription: "free",
      //   user_type: "standard",
      //   genres: [],
      //   profile_image: "default.png",
    });
    const savedPredefinedUser = await dataSource.getRepository(User).save(predefinedUser);
    const users = [savedPredefinedUser, ...(await userFactory.saveMany(9))];

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
  }
}
