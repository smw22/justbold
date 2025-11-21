// Using a type union (recommended for simple cases)
type ContextVariant = "profile" | "post";

export default function ContextMenu({ children }: { children: any }) {
  return (
    <section className="glass-card bg-neutral-grey text-white rounded-3xl max-w-60 p-2 flex flex-col gap-1">
      {children}
    </section>
  );
}
