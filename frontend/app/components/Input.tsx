import React from "react";
import Icon from "./icon";

type InputVariant = "onboarding" | "search" | "comment";

type InputProps = {
  icon?: string;
  variant?: InputVariant;
  className?: string;
  textarea?: boolean;
  onClear?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ icon, variant, className = "", textarea, onClear, ...rest }, ref) => {
    const handleClear = () => {
      if (onClear) {
        onClear();
      }
      if (ref && typeof ref !== "function") {
        ref.current?.focus();
      }
    };

    if (textarea) {
      return (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={`p-2.5 bg-light-grey outline-black/30 focus:outline-primary-yellow rounded-lg outline-1 ${className}`}
          {...rest}
        />
      );
    }

    switch (variant) {
      case "onboarding":
        return (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={`bg-transparent p-2.5 text-center rounded-lg border border-black/20 focus:outline-1 ${className}`}
            {...rest}
          />
        );
      case "comment":
        return (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={`bg-transparent p-2.5 text-left rounded-lg outline-none ${className}`}
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
        return (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={`p-2.5 bg-light-grey outline-black/30 focus:outline-primary-yellow rounded-lg outline-1 ${className}`}
            {...rest}
          />
        );
    }
  }
);

Input.displayName = "Input";

export default Input;
