import Icon from "./icon";
import CardMedia from "./CardMedia";
export default function PostRedacted() {
  return (
    <div className="bg-white flex flex-col gap-4 w-full items-start overflow-hidden p-4 md:p-8">
      <div className={`flex flex-row items-center w-full px-2 gap-2`}>
        <div className={`flex flex-row items-center gap-2 w-full`}>
          <div className="flex flex-row gap-2 w-full items-center hover:opacity-40 transition-opacity duration-400 ease-in-out">
            <div className="w-8 h-8 bg-neutral-100 object-cover rounded-full min-w-8 animate-pulse" />
            <div className="h-4 w-3/12 bg-neutral-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="gap-4 flex flex-col w-full">
        <div className="mx-2 h-6 w-6/12 bg-neutral-100 rounded-lg animate-pulse"></div>
        <CardMedia variant="image" url={""} />
        <div className="mx-2 h-4 w-10/12 bg-neutral-100 rounded-lg animate-pulse"></div>
        <div className="mx-2 h-4 w-7/12 bg-neutral-100 rounded-lg animate-pulse"></div>
        <div className="mx-2 h-4 w-3/12 bg-neutral-100 rounded-lg animate-pulse"></div>
      </div>

      <div className="px-2 flex gap-4 w-full">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 bg-neutral-100 object-cover rounded-full min-w-8 animate-pulse" />
          <div className="h-4 w-4 bg-neutral-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 bg-neutral-100 object-cover rounded-full min-w-8 animate-pulse" />
          <div className="h-4 w-4 bg-neutral-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="w-8 h-8 bg-neutral-100 object-cover rounded-full min-w-8 animate-pulse" />
      </div>
    </div>
  );
}
