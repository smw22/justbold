import { useState } from "react";
import { useParams, useLoaderData, useActionData, useNavigation, useRouteError, Link, href, Outlet } from "react-router";
import Icon from "~/components/icon";
import ProfileHeader from "~/components/ProfileHeader";
import Tabs from "~/components/Tabs";
import Post from "~/components/Post";
import SoMeInstagram from "../../assets/icons/SoMeInstagram.svg";
import SoMeTwitter from "../../assets/icons/SoMeTwitter.svg";
import SoMeFacebook from "../../assets/icons/SoMeFacebook.svg";
import SoMeYouTube from "../../assets/icons/SoMeYouTube.svg";
import SoMeTikTok from "../../assets/icons/SoMeTikTok.svg";
import type { PostType } from "~/types/post";
import type { ProfileType } from "~/types/profile";

export async function clientLoader({ params }: { params: { profileId: string } }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const profileResponse = await fetch(`${apiUrl}/users/${params.profileId}`);
  const postsResponse = await fetch(`${apiUrl}/users/${params.profileId}/posts`);
  if (!profileResponse.ok || !postsResponse.ok) {
    throw new Error("Unknown error.");
  }

  if (profileResponse.status === 404) {
    throw new Response("Profile not found", { status: 404 });
  }

  const profile = await profileResponse.json();
  const user_posts = await postsResponse.json();
  console.log(user_posts.data);

  return {
    profile,
    user_posts,
  };
}

export default function Users() {
  // Access the profile from the loader
  const { profile, user_posts } = useLoaderData();
  const [tab, setTab] = useState(0);

  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl m-auto">
        {/* // The profile header component */}
        <ProfileHeader
          name={profile.data.name}
          bio={profile.data.bio}
          connection_count={profile.data.connections.length}
          post_count={user_posts.data ? user_posts.data.length : 0}
          image={profile.data.profile_image}
          theme={profile.data.theme}
        />
        {/* // Tabs component, "About" and "Posts" - the current tab is held as a number in a state. */}
        <Tabs tabs={["About", "Posts"]} currentTab={tab} setTab={(e) => setTab(e)} />
        {/* // if tab is 0 we show about - otherwise we show posts. */}
        {tab === 0 ? <About profile={profile.data} /> : <Posts posts={user_posts.data} />}
      </div>
    </div>
  );
}

function About({ profile }: { profile: ProfileType }) {
  return (
    <article className="bg-white p-4 flex flex-col gap-4 pb-36">
      <section>
        <h5 className="font-normal text-gray-400! text-sm">About me</h5>
        <p className="text-sm mx-4 my-3 max-w-md">{profile.about}</p>
      </section>
      <section>
        <h5 className="font-normal text-gray-400! text-sm">What I am looking for</h5>
        <div className="flex flex-row gap-1 mx-4 my-3">
          {profile.looking_for.map((str) => (
            <p className={`inline-flex text-white bg-${profile.theme} capitalize px-3 py-1 rounded-full`}>{str}</p>
          ))}
        </div>
      </section>
      <section>
        <h5 className="font-normal text-gray-400! text-sm">Genres</h5>
        <div className="flex flex-row gap-1 mx-4 my-3">
          {profile.genres.map((str) => (
            <p className={`inline-flex text-white bg-${profile.theme} capitalize px-3 py-1 rounded-full`}>{str}</p>
          ))}
        </div>
      </section>
      <section>
        <h5 className="font-normal text-gray-400! text-sm">Reviews</h5>
        <p className="text-sm mx-4 my-3">Her skal vi lave kald til review endpoint</p>
      </section>
      <section>
        <h5 className="font-normal text-gray-400! text-sm">Social media</h5>
        <div className="flex flex-row gap-2 mx-2 my-3 items-center">
          {profile.instagram && (
            <Link to={profile.instagram} target="blank" className="hover:opacity-40 transition-opacity duration-200 ease-in-out">
              <img src={SoMeInstagram} alt="Instagram" className="w-10 m-2" />
            </Link>
          )}
          {profile.twitter && (
            <Link to={profile.twitter} target="blank" className="hover:opacity-40 transition-opacity duration-200 ease-in-out">
              <img src={SoMeTwitter} alt="Twitter" className="w-10 m-2" />
            </Link>
          )}

          {profile.youtube && (
            <Link to={profile.youtube} target="blank" className="hover:opacity-40 transition-opacity duration-200 ease-in-out">
              <img src={SoMeYouTube} alt="YouTube" className="w-10 m-2" />
            </Link>
          )}
          {profile.tiktok && (
            <Link to={profile.tiktok} target="blank" className="hover:opacity-40 transition-opacity duration-200 ease-in-out">
              <img src={SoMeTikTok} alt="TikTok" className="w-10 m-2" />
            </Link>
          )}
          {profile.facebook && (
            <Link to={profile.facebook} target="blank" className="hover:opacity-40 transition-opacity duration-200 ease-in-out">
              <img src={SoMeFacebook} alt="Facebook" className="w-10 m-2" />
            </Link>
          )}
        </div>
      </section>
      <section>
        <h5 className="font-normal text-gray-400! text-sm">Artists I like</h5>
      </section>
      <section>
        <h5 className="font-normal text-gray-400! text-sm">My Music</h5>
        <div className="m-4">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: 12 }}
            src={`https://open.spotify.com/embed/${profile.spotify_embed_link.split("spotify.com/")[1]}?utm_source=generator`}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <section>
        <h5 className="font-normal text-gray-400! text-sm">Videos</h5>
        <div className="m-4 flex flex-col md:grid md:grid-cols-2 gap-4">
          {profile.videos.map((video) => (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                style={{ borderRadius: 12 }}
                src={`https://www.youtube.com/embed/${video.split("?v=")[1]}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h5 className="font-normal text-gray-400! text-sm">Past collaborations</h5>
        <p className="text-sm mx-4 my-3">Her skal vi lave kald til collaborations endpoint</p>
      </section>
      <section>
        <h5 className="font-normal text-gray-400! text-sm">Questions</h5>
        <p className="text-sm mx-4 my-3">Her skal vi lave kald til questions endpoint</p>
      </section>
      <section>
        <h5 className="font-normal text-lg">Ask me a question</h5>
        <div className={`flex items-center border-${profile.theme} border rounded-full mx-2 my-4`}>
          <input className="outline-none px-5 py-5 w-full" placeholder="Type your question here..." />
          <button
            className={`cursor-pointer hover:opacity-40 bg-${profile.theme} text-white min-w-12 w-12 h-12 m-2 flex items-center justify-center rounded-full transition-opacity duration-200 ease-in-out`}
          >
            <Icon name="SendDiagonal" size={24} />
          </button>
        </div>
      </section>
    </article>
  );
}

function Posts({ posts }: { posts: PostType[] }) {
  return (
    <>
      {posts.map((post: PostType) => (
        <Post post={post} />
      ))}
    </>
  );
}
