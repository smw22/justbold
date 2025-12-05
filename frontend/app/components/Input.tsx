import React from "react";
import Icon from "./icon";

type InputVariant = "onboarding" | "other";

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
    case "other":
      return (
        <div className="relative">
          <input ref={ref} className={`bg-lightgrey pr-10 ${className}`} {...rest} />
          {icon && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Icon name={icon} size={24} />
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
