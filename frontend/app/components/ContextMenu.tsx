// Using a type union (recommended for simple cases)
type ContextVariant = "profile" | "post";

export default function ContextMenu({ show, children }: { show: boolean; children: any }) {
  return (
    <div className="absolute top-10 right-0">
      <div className="glass-card bg-neutral-grey text-white rounded-3xl min-w-60 max-w-60 p-2 flex flex-col gap-1">{children}</div>
    </div>
  );
}
