import CardMedia from "~/components/CardMedia";

export default function CollaborationsCardRedacted() {
  return (
    <div className="bg-white border border-black/10 p-4 rounded-3xl overflow-hidden flex flex-col gap-4 h-full">
      <div className="flex items-center gap-1 border-b border-gray-200 pb-4 ">
        <div className="flex items-center gap-1 flex-1">
          <div className="size-10 rounded-full bg-neutral-100" />
          <div className="h-4 w-3/12 bg-neutral-100 rounded-lg"></div>
        </div>
      </div>
      <div className="h-6 w-6/12 bg-neutral-100 rounded-lg"></div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="h-4 w-1/12 bg-neutral-100 rounded-lg"></div>
        <div className="h-4 w-3/12 bg-neutral-100 rounded-lg"></div>
      </div>
      <CardMedia variant="image" url="" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-10/12 bg-neutral-100 rounded-lg"></div>
        <div className="h-4 w-7/12 bg-neutral-100 rounded-lg"></div>
      </div>
      <div className="mt-auto flex items-center justify-between gap-4">
        <div className="h-4 w-2/12 bg-neutral-100 rounded-lg"></div>
      </div>
    </div>
  );
}
