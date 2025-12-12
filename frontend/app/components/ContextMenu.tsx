import { useRef, useEffect } from "react";

// Using a type union (recommended for simple cases)
type ContextVariant = "profile" | "post";

export default function ContextMenu({
  show,
  setShow,
  classname,
  children,
}: {
  show: boolean;
  setShow: (e: boolean) => void;
  classname?: string;
  children: any;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
  });

  return (
    <div ref={menuRef} className={`${show ? "absolute" : "hidden"} top-10 right-0 display ${classname}`}>
      <div className="glass-card bg-neutral-grey text-white rounded-3xl min-w-60 max-w-60 p-2 flex flex-col gap-1">
        {children}
      </div>
    </div>
  );
}
