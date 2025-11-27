export default function Toggle({
  value,
  onClick,
  className,
}: {
  value: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <label
      className={`toggle relative inline-block w-14 h-7 ${className || ""}`}
    >
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        checked={value}
        onChange={onClick}
      />
      <span className="toggle-switch absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-all rounded-[34px] duration-100 ease-in-out"></span>
    </label>
  );
}
