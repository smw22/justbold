import AppDataSource from "../config/typeorm.config";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./main.seeder";

// Factories
import { PostFactory } from "./post.factory";
import { UserFactory } from "./user.factory";
import { TagFactory } from "./tag.factory";
import { GenreFactory } from "./genre.factory";
import { CollaborationFactory } from "./collaboration.factory";
import { ServiceFactory } from "./service.factory";
import { ReviewFactory } from "./reviews.factory";
import { SkillFactory } from "./skill.factory";
import { CommentFactory } from "./comment.factory";
import { LikeFactory } from "./like.factory";
import { ThreadFactory } from "./thread.factory";
import { MessageFactory } from "./message.factory";

const options: DataSourceOptions & SeederOptions = {
  ...AppDataSource.options,
  factories: [
    PostFactory,
    UserFactory,
    TagFactory,
    GenreFactory,
    CollaborationFactory,
    ServiceFactory,
    ReviewFactory,
    SkillFactory,
    CommentFactory,
    LikeFactory,
    ThreadFactory,
    MessageFactory,
  ],
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);
datasource.initialize().then(async () => {
  await datasource.synchronize(true);
  await runSeeders(datasource);
  process.exit();
});
