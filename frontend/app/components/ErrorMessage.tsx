import Icon from "./icon";
export default function ErrorMessage({ error }: { error: string }) {
  return error ? (
    <div className="outer-wrapper">
      <div className="flex gap-2 items-center border border-red-400 rounded-lg bg-red-50 p-2 text-red-600">
        <Icon name="Help" size={24} />
        <p className="text-sm">{error}</p>
      </div>
    </div>
  ) : null;
}
