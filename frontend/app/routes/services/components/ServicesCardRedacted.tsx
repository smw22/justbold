import CardMedia from "~/components/CardMedia";
export default function ServicesCardRedacted() {
  return (
    <div className="flex flex-col gap-4 p-4 m-auto w-[90%] border border-gray-300 rounded-3xl shadow-lg">
      <div className="flex items-center justify-start border-b border-gray-300 pb-2">
        <div className="w-8 h-8 bg-neutral-200 object-cover rounded-full min-w-8" />
        <div className="mx-2 h-4 w-3/12 bg-neutral-200 rounded-lg"></div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="h-6 w-7/12 bg-neutral-200 rounded-lg"></div>
        <CardMedia variant="image" url={""} />
        <div className="h-4 w-10/12 bg-neutral-200 rounded-lg"></div>
        <div className="h-4 w-8/12 bg-neutral-200 rounded-lg"></div>
        <div className="h-4 w-4/12 bg-neutral-200 rounded-lg"></div>
        <div className="flex justify-between mt-2">
          <div className="h-4 w-2/12 bg-neutral-200 rounded-lg"></div>
          <div className="h-4 w-3/12 bg-neutral-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
