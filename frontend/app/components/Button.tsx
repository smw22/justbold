// Using a type union (recommended for simple cases)
type ButtonVariant = "primary" | "primary-glass" | "secondary" | "secondary-glass" | "context-menu";

export default function Button({ text, icon, variant, fullWidth, onClick }: { text: string; icon?: string; variant: ButtonVariant; fullWidth?: boolean; onClick?: () => void }) {
  switch (variant) {
    case "primary":
      return (
        <button
          className={`bg-primary-yellow text-black rounded-full px-4 py-2 hover:bg-primary-yellow-hover cursor-pointer transition-colors duration-400 ease-in-out ${fullWidth ? "w-full" : ""}`}
          onClick={onClick}
        >
          {icon}&nbsp;{text}
        </button>
      );
    case "primary-glass":
      return (
        <button
          className={`glass-card bg-primary-yellow text-white rounded-full px-4 py-2 hover:bg-primary-yellow-hover cursor-pointer transition-colors duration-400 ease-in-out ${fullWidth ? "w-full" : ""}`}
          onClick={onClick}
        >
          {icon}&nbsp;{text}
        </button>
      );
    case "secondary":
      return (
        <button
          className={`bg-transparent text-neutral-grey rounded-full px-4 py-2 hover:bg-primary-yellow-semi-transparent cursor-pointer transition-colors duration-400 ease-in-out outline outline-1 outline-neutral-grey -outline-offset-1" ${fullWidth ? "w-full" : ""}`}
          onClick={onClick}
        >
          {icon}&nbsp;{text}
        </button>
      );
    case "secondary-glass":
      return (
        <button
          className={`bg-primary-yellow text-black text-sm rounded-full px-3 py-1 hover:bg-primary-yellow-hover cursor-pointer transition-colors duration-400 ease-in-out ${fullWidth ? "w-full" : ""}`}
          onClick={onClick}
        >
          {icon}&nbsp;{text}
        </button>
      );
    case "context-menu":
      return (
        <button className={`hover:bg-neutral-grey rounded-lg transition-colors cursor-pointer p-1 duration-400 ease-in-out ${fullWidth ? "w-full" : ""}`} onClick={onClick}>
          {icon}&nbsp;{text}
        </button>
      );
  }
}
