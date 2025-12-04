import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import SoMeInstagram from "../../assets/icons/SoMeInstagram.svg";
import SoMeTwitter from "../../assets/icons/SoMeTwitter.svg";
import SoMeFacebook from "../../assets/icons/SoMeFacebook.svg";
import SoMeYouTube from "../../assets/icons/SoMeYouTube.svg";
import SoMeTikTok from "../../assets/icons/SoMeTikTok.svg";
import type { QuestionType } from "~/types/question";
import EditArray from "./components/EditArray";
import Input from "~/components/Input";

export async function clientLoader() {
  const currentUser = localStorage.getItem("user_id");

  const profileResponse = await apiFetch(`/users/${currentUser}`);
  const questionsResponse = await apiFetch(`/users/${currentUser}/questions`);
  const genresResponse = await apiFetch(`/genres`);

  if (!profileResponse.ok || !questionsResponse.ok || !genresResponse.ok) {
    throw new Error("Unknown error.");
  }

  if (profileResponse.status === 404) {
    throw new Response("Profile not found", { status: 404 });
  }

  const profile = await profileResponse.json();
  const questions = await questionsResponse.json();
  const genres = await genresResponse.json();

  return {
    profile,
    questions,
    genres,
  };
}

export default function ProfileEdit() {
  const { profile, questions, genres } = useLoaderData();
  const [userGenres, setUserGenres] = useState(profile.data.genres);
  const [userLookingFor, setUserLookingFor] = useState(profile.data.looking_for);
  const [userVideos, setUserVideos] = useState(profile.data.videos);

  return (
    <article className="outer-wrapper">
      <section className="flex flex-col items-center justify-center gap-4">
        <img
          src="https://loremflickr.com/640/480?lock=702965218279424"
          className="bg-black w-36 h-36 rounded-full object-cover"
          alt="profile picture"
        />
        <button
          className="text-neutral-grey font-bold text-sm hover:opacity-50 transition-opacity duration-200 ease-in-put cursor-pointer"
          onClick={() => alert("Her skal der være billedeupload functionality.")}
        >
          Edit picture
        </button>
      </section>
      <section className="m-4 bg-white rounded-3xl border border-gray-200 text-sm">
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-20">Name</p>
          <input type="text" placeholder="First and last name" className="flex-1 p-2 border-b border-b-gray-200" />
        </div>
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-20">Bio</p>
          <input type="text" placeholder="Short biography" className="flex-1 p-2 border-b border-b-gray-200" />
        </div>
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-20">About me</p>
          <textarea placeholder="Who am I?" className="flex-1 p-2 border-b border-b-gray-200 min-h-20 max-h-40" />
        </div>
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-20">What I am looking for</p>
          <EditArray
            array={userLookingFor}
            editableText={true}
            placeholder="Write what you're looking for..."
            onChange={(e: string[]) => setUserLookingFor(e)}
          />
        </div>
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-20">Genres</p>
          <EditArray
            array={userGenres}
            editableText={false}
            selectOptions={genres.data.map((genre: { id: string; title: string }) => genre.title)}
            placeholder="Pick genre..."
            onChange={(e: string[]) => setUserGenres(e)}
          />
        </div>
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-20">Theme</p>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-2">
              <label htmlFor="html">
                <div className="bg-header-bg-1 w-8 h-8 rounded-full"></div>
              </label>
              <input
                type="radio"
                id="html"
                name="fav_language"
                value="header-bg-1"
                defaultChecked={profile.data.theme === "header-bg-1"}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <label htmlFor="html">
                <div className="bg-header-bg-2 w-8 h-8 rounded-full"></div>
              </label>
              <input
                type="radio"
                id="html"
                name="fav_language"
                value="header-bg-2"
                defaultChecked={profile.data.theme === "header-bg-2"}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <label htmlFor="html">
                <div className="bg-header-bg-3 w-8 h-8 rounded-full"></div>
              </label>
              <input
                type="radio"
                id="html"
                name="fav_language"
                value="header-bg-3"
                defaultChecked={profile.data.theme === "header-bg-3"}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <label htmlFor="html">
                <div className="bg-header-bg-4 w-8 h-8 rounded-full"></div>
              </label>
              <input
                type="radio"
                id="html"
                name="fav_language"
                value="header-bg-4"
                defaultChecked={profile.data.theme === "header-bg-4"}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <label htmlFor="html">
                <div className="bg-header-bg-5 w-8 h-8 rounded-full"></div>
              </label>
              <input
                type="radio"
                id="html"
                name="fav_language"
                value="header-bg-5"
                defaultChecked={profile.data.theme === "header-bg-5"}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <label htmlFor="html">
                <div className="bg-header-bg-6 w-8 h-8 rounded-full"></div>
              </label>
              <input
                type="radio"
                id="html"
                name="fav_language"
                value="header-bg-6"
                defaultChecked={profile.data.theme === "header-bg-6"}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <label htmlFor="html">
                <div className="bg-header-bg-7 w-8 h-8 rounded-full"></div>
              </label>
              <input
                type="radio"
                id="html"
                name="fav_language"
                value="header-bg-7"
                defaultChecked={profile.data.theme === "header-bg-7"}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="m-4 bg-white rounded-3xl border border-gray-200 text-sm">
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-20">Social media</p>
          <div className="flex flex-row flex-wrap gap-4 my-3 items-center">
            <p className="text-xs text-neutral-500">Leave a field empty to hide from your profile.</p>
            <div className="flex w-full gap-2">
              <Input variant="onboarding" className="flex-1" defaultValue={`${profile.data.instagram}`} />
              <img src={SoMeInstagram} alt="Instagram" className="w-8" />
            </div>
            <div className="flex w-full gap-2">
              <Input variant="onboarding" className="flex-1" defaultValue={`${profile.data.twitter}`} />
              <img src={SoMeTwitter} alt="Twitter" className="w-8" />
            </div>
            <div className="flex w-full gap-2">
              <Input variant="onboarding" className="flex-1" defaultValue={`${profile.data.youtube}`} />
              <img src={SoMeYouTube} alt="YouTube" className="w-8" />
            </div>
            <div className="flex w-full gap-2">
              <Input variant="onboarding" className="flex-1" defaultValue={`${profile.data.tiktok}`} />
              <img src={SoMeTikTok} alt="TikTok" className="w-8" />
            </div>
            <div className="flex w-full gap-2">
              <Input variant="onboarding" className="flex-1" defaultValue={`${profile.data.facebook}`} />
              <img src={SoMeFacebook} alt="Facebook" className="w-8" />
            </div>
          </div>
        </div>
      </section>
      <section className="m-4 bg-white rounded-3xl border border-gray-200 text-sm">
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-20">My music</p>
          {/* <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: 12 }}
            src={`https://open.spotify.com/embed/${profile.data.spotify_embed_link?.split("spotify.com/")[1]}?utm_source=generator`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe> */}
          <div className="gap-2 flex flex-col my-3 w-full">
            <p className="text-xs text-neutral-500">Input your Spotify artist link to display your music.</p>
            <Input variant="onboarding" className="flex-1" defaultValue={`${profile.data.spotify_embed_link}`} />
          </div>
        </div>
      </section>
      <section className="m-4 bg-white rounded-3xl border border-gray-200 text-sm">
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-20">Videos</p>
          <div className="gap-2 flex flex-col my-3 w-full">
            <p className="text-xs text-neutral-500">Add YouTube links to display videos on your profile.</p>
            <EditArray
              array={userVideos}
              editableText={true}
              placeholder="Input a YouTube URL..."
              onChange={(e: string[]) => setUserVideos(e)}
            />
          </div>
        </div>
      </section>
      <section className="m-4 bg-white rounded-3xl border border-gray-200 text-sm">
        <div className="p-4 flex flex-col gap-4">
          <p className="py-2 w-20 min-w-20">Questions</p>
          {questions.data.map((q: QuestionType) => (
            <div className="mx-4">
              <p className="font-bold">{q.question}</p>
              <input type="text" placeholder="Write your answer." className="flex-1 p-2 border-b border-b-gray-200 w-full" />
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
