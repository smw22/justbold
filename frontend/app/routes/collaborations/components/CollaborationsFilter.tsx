import Icon from "~/components/icon";

export default function CollaborationsFilter() {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search collaborations..."
        className="w-full p-2 rounded-lg bg-neutral-200 outline-primary-yellow"
      />
      <button className="flex items-center gap-1">
        <Icon name="Filter" size={24} />
        <span>Filter</span>
      </button>
    </div>
  );
}
