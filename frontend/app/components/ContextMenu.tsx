// Using a type union (recommended for simple cases)
type ContextVariant = "profile" | "post";

export default function ContextMenu({ children }: { children: any }) {
  return <section className="glass-card bg-neutral-grey text-white rounded-lg p-1 flex flex-col gap-1">{children}</section>;
}
