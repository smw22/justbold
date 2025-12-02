import SoMeInstagram from "../../assets/icons/SoMeInstagram.svg";
import SoMeTwitter from "../../assets/icons/SoMeTwitter.svg";
import SoMeFacebook from "../../assets/icons/SoMeFacebook.svg";
import SoMeYouTube from "../../assets/icons/SoMeYouTube.svg";
import SoMeTikTok from "../../assets/icons/SoMeTikTok.svg";

export default function ProfileEdit() {
  // static values - change later
  const tags = ["Guitar", "Producer", "Singer"];
  const theme = "header-bg-1";
  const spotify = "https://open.spotify.com/artist/67pwWZtcg7U2P2keoeC9jW?si=LSqoLE8GQSOi4WYcr70xdA";
  const videos = ["https://www.youtube.com/watch?v=vZprj9wfAAs", "https://www.youtube.com/watch?v=O5aGZ78zr14"];
  const questions = [
    { question: "dsflskdlf", answer: "hksdflbsd" },
    { question: "dsflskdlf", answer: "hksdflbsd" },
  ];

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
          <p className="py-2 w-20 min-w-2">Name</p>
          <input type="text" placeholder="First and last name" className="flex-1 p-2 border-b border-b-gray-200" />
        </div>
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-2">Bio</p>
          <input type="text" placeholder="Short biography" className="flex-1 p-2 border-b border-b-gray-200" />
        </div>
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-2">About me</p>
          <textarea placeholder="Who am I?" className="flex-1 p-2 border-b border-b-gray-200 min-h-20 max-h-40" />
        </div>
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-2">What I am looking for</p>
          <div className="flex flex-wrap flex-row justify-start items-center gap-2">
            {tags.map((tag) => (
              <p className={`inline-flex text-white bg-${theme} capitalize px-3 py-1 rounded-full`}>{tag}</p>
            ))}
            <button
              onClick={() => alert("edit functionality")}
              className="text-neutral-grey text-sm hover:opacity-50 transition-opacity duration-200 ease-in-put cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-2">Genres</p>
          <div className="flex flex-wrap flex-row justify-start items-center gap-2">
            {tags.map((tag) => (
              <p className={`inline-flex text-white bg-${theme} capitalize px-3 py-1 rounded-full`}>{tag}</p>
            ))}
            <button
              onClick={() => alert("edit functionality")}
              className="text-neutral-grey text-sm hover:opacity-50 transition-opacity duration-200 ease-in-put cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-2">Theme</p>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 bg-${theme} rounded-full`}></div>
            <button
              onClick={() => alert("edit functionality")}
              className="text-neutral-grey text-sm hover:opacity-50 transition-opacity duration-200 ease-in-put cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>
      </section>
      <section className="m-4 bg-white rounded-3xl border border-gray-200 text-sm">
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-2">Social media</p>
          <div className="flex flex-row flex-wrap gap-4 my-3 items-center">
            <img src={SoMeInstagram} alt="Instagram" className="w-8" />
            <img src={SoMeTwitter} alt="Twitter" className="w-8" />
            <img src={SoMeYouTube} alt="YouTube" className="w-8" />
            <img src={SoMeTikTok} alt="TikTok" className="w-8" />
            <img src={SoMeFacebook} alt="Facebook" className="w-8" />
          </div>
          <button
            onClick={() => alert("edit functionality")}
            className="text-neutral-grey text-sm hover:opacity-50 transition-opacity duration-200 ease-in-put cursor-pointer"
          >
            Edit
          </button>
        </div>
      </section>
      <section className="m-4 bg-white rounded-3xl border border-gray-200 text-sm">
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-2">My music</p>
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: 12 }}
            src={`https://open.spotify.com/embed/${spotify?.split("spotify.com/")[1]}?utm_source=generator`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <button
            onClick={() => alert("edit functionality")}
            className="text-neutral-grey text-sm hover:opacity-50 transition-opacity duration-200 ease-in-put cursor-pointer"
          >
            Edit
          </button>
        </div>
      </section>
      <section className="m-4 bg-white rounded-3xl border border-gray-200 text-sm">
        <div className="p-4 flex gap-4">
          <p className="py-2 w-20 min-w-2">Videos</p>
          <div className="flex flex-col flex-1 gap-4">
            {videos?.map((video) => (
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  style={{ borderRadius: 12 }}
                  src={`https://www.youtube.com/embed/${video?.split("?v=")[1]}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
          <button
            onClick={() => alert("edit functionality")}
            className="text-neutral-grey text-sm hover:opacity-50 transition-opacity duration-200 ease-in-put cursor-pointer"
          >
            Edit
          </button>
        </div>
      </section>
      <section className="m-4 bg-white rounded-3xl border border-gray-200 text-sm">
        <div className="p-4 flex flex-col gap-4">
          <p className="py-2 w-20 min-w-2">Questions</p>
          {questions.map((q) => (
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
