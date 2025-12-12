import Icon from "./icon";
export default function ErrorMessage({ error }: { error: string }) {
  return error ? (
    <div className="flex gap-2 items-center border border-neutral-300 rounded-lg bg-neutral-100 p-2">
      <Icon name="Help" size={24} />
      <p className="text-sm">{error}</p>
    </div>
  ) : null;
}
