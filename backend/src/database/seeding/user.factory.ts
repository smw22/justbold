import { Faker } from "@faker-js/faker";
import { User } from "../../users/entities/user.entity";
import { setSeederFactory } from "typeorm-extension";

export const UserFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.phone = faker.phone.number();
  user.year_of_birth = faker.date.birthdate({ min: 1970, max: 2020, mode: "year" }).getFullYear();
  user.bio = faker.lorem.sentence();
  user.about = faker.lorem.paragraph();
  user.location = faker.location.city();
  user.theme = faker.helpers.arrayElement([
    "header-bg-1",
    "header-bg-2",
    "header-bg-3",
    "header-bg-4",
    "header-bg-5",
    "header-bg-6",
    "header-bg-7",
  ]);
  user.instagram = "https://www.instagram.com/" + faker.internet.userName();
  user.twitter = "https://www.twitter.com/" + faker.internet.userName();
  user.facebook = "https://www.facebook.com/" + faker.internet.userName();
  user.youtube = "https://www.youtube.com/" + faker.internet.userName();
  user.tiktok = "https://www.tiktok.com/@" + faker.internet.userName();
  user.spotify_embed_link = "https://open.spotify.com/artist/67pwWZtcg7U2P2keoeC9jW?si=LSqoLE8GQSOi4WYcr70xdA";
  user.videos = [];
  user.looking_for = faker.helpers.arrayElements(
    [
      "band",
      "jam sessions",
      "new friends",
      "teacher",
      "students",
      "collaboration",
      "gigs",
      "practice partner",
      "mentor",
      "recording partner",
    ],
    { min: 1, max: 3 }
  );
  user.subscription = faker.helpers.arrayElement(["free", "premium", "pro"]);
  user.user_type = faker.helpers.arrayElement(["musician", "producer", "band", "venue", "label"]);
  user.genres = faker.helpers.arrayElements(
    ["Rock", "Pop", "Jazz", "Classical", "Hip Hop", "Electronic", "Country", "Reggae", "Blues", "Metal"],
    { min: 1, max: 3 }
  );
  user.profile_image = faker.image.url();
  return user;
});
