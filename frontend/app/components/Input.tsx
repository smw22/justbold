import React from "react";
import Icon from "./icon";

type InputVariant = "onboarding" | "search";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  variant: InputVariant;
  className?: string;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ icon, variant, className = "", onClear, ...rest }, ref) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
    }
    if (ref && typeof ref !== "function") {
      ref.current?.focus();
    }
  };

  switch (variant) {
    case "onboarding":
      return (
        <input
          ref={ref}
          className={`bg-transparent p-2.5 text-center rounded-lg border border-black/20 focus:outline-1 ${className}`}
          {...rest}
        />
      );
    case "search":
      return (
        <div className="relative w-full">
          <input
            ref={ref}
            className={`relative bg-black/5 p-2.5 pl-9 rounded-lg focus:outline-1 text-sm font-medium ${className}`}
            placeholder={rest.placeholder}
            {...rest}
          />
          {icon && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-grey">
              <Icon name={icon} size={16} />
            </div>
          )}
          {rest.value && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-(--darkgrey-text)"
            >
              <Icon name="Close" size={20} />
            </button>
          )}
        </div>
      );
    default:
      return null;
  }
});

Input.displayName = "Input";

export default Input;
