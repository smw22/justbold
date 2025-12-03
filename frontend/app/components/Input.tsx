import React from "react";
import Icon from "./icon";

type InputVariant = "onboarding" | "search";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  variant: InputVariant;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ icon, variant, className = "", ...rest }, ref) => {
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
        <div className="relative">
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
        </div>
      );
    default:
      return null;
  }
});

Input.displayName = "Input";

export default Input;
