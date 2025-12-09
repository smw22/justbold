import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import * as bcrypt from "bcrypt";

// Entities
import { User } from "../../users/entities/user.entity";
import { Post } from "../../posts/entities/post.entity";
import { Tag } from "../../tags/entities/tag.entity";
import { Genre } from "../../genres/entities/genre.entity";
import { Collaboration } from "../../collaborations/entities/collaboration.entity";
import { Service } from "../../services/entities/service.entity";
import { Review } from "../../reviews/entities/review.entity";
import { Skill } from "../../skills/entities/skill.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { Like } from "../../likes/entities/like.entity";

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    // Seed users
    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(9);
    // Create an admin user
    const adminUser = await userFactory.make({
      id: "c895b35e-d47b-4ee4-a844-4bb2aabb4714",
      name: "Awesome User",
      email: "test@user.com",
      password: await bcrypt.hash("admin", 10),
    });
    await dataSource.getRepository(User).save(adminUser);

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

    // Seed Skills
    const SkillFactory = factoryManager.get(Skill);
    const skillTitles = [
      "Guitar",
      "Drums",
      "Bass",
      "Vocals",
      "Piano",
      "Mixing",
      "Mastering",
      "Songwriting",
      "Producing",
      "Sound Design",
      "Low tuning",
      "Odd time signatures",
      "Good tone knowledge",
    ];
    const skills = await Promise.all(skillTitles.map((title: string) => SkillFactory.make({ title })));
    await dataSource.getRepository(Skill).save(skills);

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
      Array(100)
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

          // Assign random skills
          const randomSkills = faker.helpers.arrayElements(skills, {
            min: 1,
            max: 4,
          });
          collaboration.skills = randomSkills;

          return collaboration;
        })
    );
    await dataSource.getRepository(Collaboration).save(collaborations);

    // seed services, each linked to a random user and tag
    const serviceFactory = factoryManager.get(Service);
    const services = await Promise.all(
      Array(100)
        .fill("")
        .map(async () => {
          const user = faker.helpers.arrayElement(users);
          return serviceFactory.make({ user });
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

    // Seed comments
    const commentFactory = factoryManager.get(Comment);
    const postEntities = await dataSource.getRepository(Post).find();
    const comments = await Promise.all(
      Array(200)
        .fill("")
        .map(async () => {
          const user = faker.helpers.arrayElement(users);
          const post = faker.helpers.arrayElement(postEntities);
          return commentFactory.make({ user, post });
        })
    );
    await dataSource.getRepository("Comment").save(comments);

    // Seed likes for posts
    const likeFactory = factoryManager.get(Like);
    const likes = await Promise.all(
      Array(300)
        .fill("")
        .map(async () => {
          const user = faker.helpers.arrayElement(users);
          const post = faker.helpers.arrayElement(postEntities);
          return likeFactory.make({ user, post });
        })
    );
    await dataSource.getRepository("Like").save(likes);
  }
}
