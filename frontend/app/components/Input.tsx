import Icon from "./icon";

type InputVariant = "onboarding" | "other";

interface InputProps {
  icon?: string;
  variant: InputVariant;
  className?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
}

export default function Input({
  icon,
  variant,
  className = "",
  placeholder = "",
  type = "text",
  value,
  onChange,
  name,
  required = false,
}: InputProps) {
  switch (variant) {
    case "onboarding":
      return (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`bg-transparent p-2.5 text-center rounded-lg border border-black/20 focus:outline-1 ${className}`}
        />
      );
    case "other":
      return (
        <div className="relative">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={`bg-lightgrey pr-10 ${className}`}
          />
          {icon && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Icon name={icon} size={24} />
            </div>
          )}
        </div>
      );
  }
}
