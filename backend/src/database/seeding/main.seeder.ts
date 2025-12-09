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
import { Thread } from "../../threads/entities/thread.entity";
import { Message } from "../../messages/entities/message.entity";

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

    // Seed threads
    const threadFactory = factoryManager.get(Thread);
    const allUsers = [...users, adminUser]; // Include admin user
    const threads = await Promise.all(
      Array(50)
        .fill("")
        .map(async () => {
          const thread = await threadFactory.make();
          // Assign 2-4 random users as participants
          const threadUsers = faker.helpers.arrayElements(allUsers, {
            min: 2,
            max: 4,
          });
          thread.users = threadUsers;
          return thread;
        })
    );
    await dataSource.getRepository(Thread).save(threads);

    //Seed messages linked to threads and users
    const messageFactory = factoryManager.get(Message);
    // 1) One message per thread (This ensures all threads have at least one message)
    const onePerThread = await Promise.all(
      threads.map(async (thread) => {
        const user = faker.helpers.arrayElement(allUsers);
        return messageFactory.make({ user, thread });
      })
    );

    // 2) Extra random messages
    const extraMessages = await Promise.all(
      Array(150)
        .fill("")
        .map(async () => {
          const user = faker.helpers.arrayElement(allUsers);
          const thread = faker.helpers.arrayElement(threads);
          return messageFactory.make({ user, thread });
        })
    );

    await dataSource.getRepository(Message).save([...onePerThread, ...extraMessages]);

    // Seed comments
    const commentFactory = factoryManager.get(Comment);
    const postEntities = await dataSource.getRepository(Post).find();
    const comments: Comment[] = [];

    // First, create all comments without parentId
    for (let i = 0; i < 500; i++) {
      const user = faker.helpers.arrayElement(users);
      const post = faker.helpers.arrayElement(postEntities);
      const comment = await commentFactory.make({ user, post });
      comments.push(comment);
    }

    // Now, assign some comments as replies (with parentId)
    const numReplies = Math.floor(comments.length * 0.5); // 30% replies
    for (let i = 0; i < numReplies; i++) {
      const reply = comments[comments.length - 1 - i];
      // Only assign parent from earlier comments to avoid circular refs
      // Filter possible parents to those with the same post id
      const possibleParents = comments.slice(0, comments.length - 1 - i).filter((parent) => parent.post.id === reply.post.id);
      if (possibleParents.length > 0) {
        const parent = faker.helpers.arrayElement(possibleParents);
        reply.parent = parent;
      }
    }

    await dataSource.getRepository(Comment).save(comments);
    // Seed likes for posts and comments
    const likeFactory = factoryManager.get(Like);
    const likes = await Promise.all(
      Array(1000)
        .fill("")
        .map(async () => {
          const user = faker.helpers.arrayElement(users);
          const likeType = faker.helpers.arrayElement(["post", "comment"]);
          if (likeType === "post") {
            const post = faker.helpers.arrayElement(postEntities);
            return likeFactory.make({ user, object_id: post.id, type: "post" });
          } else {
            const comment = faker.helpers.arrayElement(comments);
            return likeFactory.make({ user, object_id: comment.id, type: "comment" });
          }
        })
    );
    await dataSource.getRepository(Like).save(likes);
  }
}
