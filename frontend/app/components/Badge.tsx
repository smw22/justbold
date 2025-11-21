type Color =
  | "header-bg-1"
  | "header-bg-2"
  | "header-bg-3"
  | "header-bg-4"
  | "header-bg-5"
  | "header-bg-6"
  | "header-bg-7";

type Variant = "filled" | "outline";

export default function Badge({
  text,
  color = "header-bg-1",
  Variant = "filled",
}: {
  text?: string;
  color?: Color;
  Variant?: Variant;
}) {
  const variantClasses =
    Variant === "outline"
      ? `border border-current bg-opacity-0 text-${color} px-3 py-1 lowercase`
      : `bg-${color} text-white px-3 py-2`;

  return (
    <div className={`${variantClasses} max-w-fit rounded-full w-full text-sm`}>
      {Variant === "outline" && "#"}
      {text}
    </div>
  );
}
