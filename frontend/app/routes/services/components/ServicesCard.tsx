import Icon from "~/components/icon";

export default function ServicesCard() {
  return (
    <div className="flex flex-col gap-4 p-4 m-auto w-[90%] max-w-md border border-gray-300 rounded-3xl shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-300 pb-2">
        <div className="flex gap-2">
          <div className="w-[25px] h-[25px]">
            <img
              src="images/user-avatar.png"
              alt="user avatar"
              className="w-full"
            />
          </div>
          <span>EchoLabs Studio</span>
        </div>

        <span className="text-lightgrey">#recording</span>
        <div>
          <Icon name="BookmarkEmpty" size={24}></Icon>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <h2>Full-service recording and mixing</h2>
        </div>
        <div className="relative">
          <Icon
            name="Mic"
            size={24}
            className="absolute top-4 right-4 bg-neutral-grey rounded-md text-white p-1"
          />
          <img
            src="images/studio-example.png"
            alt="user avatar"
            className="w-full rounded-2xl"
          />
        </div>
        <p className="line-clamp-3">
          Album covers, tour posters, and stage visuals crafted to reflect your
          sound and style. Work directly with an artist experienced in branding
          for musicians.
        </p>
        <div className="flex justify-between">
          <a href="" className="font-bold underline">
            Read more...
          </a>
          <span className="text-lightgrey">Aarhus - 4h ago</span>
        </div>
      </div>
    </div>
  );
}
