export default function CollaborationsSliderCardRedacted() {
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col gap-1 p-4 h-full">
      <div className="flex items-center gap-1 border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center gap-1 w-full">
          <div className="size-8 rounded-full bg-neutral-100" />
          <div className="h-4 w-4/12 bg-neutral-100 rounded-lg"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-6 w-6/12 bg-neutral-100 rounded-lg"></div>
        <div className="h-4 w-10/12 bg-neutral-100 rounded-lg"></div>
        <div className="h-4 w-7/12 bg-neutral-100 rounded-lg"></div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="h-4 w-2/12 bg-neutral-100 rounded-lg"></div>
        <div className="h-4 w-3/12 bg-neutral-100 rounded-lg"></div>
      </div>
    </div>
  );
}
