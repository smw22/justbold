import React from "react";
import Icon from "./icon";

type InputVariant = "onboarding" | "other";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  variant?: InputVariant;
  className?: string;
  textarea?: boolean;
}

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ icon, variant, className = "", textarea, ...rest }, ref) => {
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
    default:
      return (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={`p-2.5 bg-light-grey outline-black/30 focus:outline-primary-yellow rounded-lg outline-1 ${className}`}
          {...rest}
        />
      );
  }
});

Input.displayName = "Input";

export default Input;
