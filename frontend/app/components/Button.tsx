import Icon from "./icon";

// Using a type union (recommended for simple cases)
type ButtonVariant =
  | "primary"
  | "primary-glass"
  | "secondary"
  | "secondary-glass"
  | "context-menu";

export default function Button({
  text,
  icon,
  variant,
  fullWidth,
  onClick,
  className,
}: {
  text: string;
  icon?: string;
  variant: ButtonVariant;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  switch (variant) {
    case "primary":
      return (
        <button
          className={`bg-primary-yellow text-black flex items-center justify-center gap-2 rounded-full px-4 py-2 hover:bg-primary-yellow-hover focus:bg-primary-yellow-pressed cursor-pointer transition-colors duration-400 ease-in-out ${fullWidth ? "w-full" : "w-fit"} ${className ?? ""}`}
          onClick={onClick}
        >
          <Icon name={icon ? icon : ""} size={18} />
          {text}
        </button>
      );
    case "primary-glass":
      return (
        <button
          className={`glass-button bg-primary-yellow text-white flex items-center justify-center gap-2 rounded-full px-4 py-2 cursor-pointer transition-colors duration-400 ease-in-out ${fullWidth ? "w-full" : "w-fit"} ${className ?? ""}`}
          onClick={onClick}
        >
          {text}
          <Icon name={icon ? icon : ""} size={18} />
        </button>
      );
    case "secondary":
      return (
        <button
          className={`bg-transparent text-neutral-grey flex items-center justify-center gap-2 rounded-full px-4 py-2 hover:bg-primary-yellow-hover focus:bg-primary-yellow-semi-transparent cursor-pointer transition-colors duration-400 ease-in-out outline outline-1 outline-neutral-grey -outline-offset-1" ${fullWidth ? "w-full" : "w-fit"} ${className ?? ""}`}
          onClick={onClick}
        >
          <Icon name={icon ? icon : ""} size={18} />
          {text}
        </button>
      );
    case "secondary-glass":
      return (
        <button
          className={`bg-primary-yellow text-black flex items-center justify-center gap-2 text-sm rounded-full px-3 py-1 hover:bg-primary-yellow-hover focus:bg-primary-yellow-pressed cursor-pointer transition-colors duration-400 ease-in-out ${fullWidth ? "w-full" : "w-fit"} ${className ?? ""}`}
          onClick={onClick}
        >
          <Icon name={icon ? icon : ""} size={18} />
          {text}
        </button>
      );
    case "context-menu":
      return (
        <button
          className={`hover:bg-neutral-grey flex items-center justify-start gap-2 text-left rounded-2xl leading-tight transition-colors cursor-pointer p-2 duration-400 ease-in-out ${fullWidth ? "w-full" : "w-fit"} ${className ?? ""}`}
          onClick={onClick}
        >
          <Icon name={icon ? icon : ""} size={24} />
          {text}
        </button>
      );
  }
}
