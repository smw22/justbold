import Icon from "~/components/icon";

interface OptionButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function OptionButton({ text, isSelected, onClick }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-4 w-[273px] px-2.5 py-3.5 rounded-full border transition-all duration-300 cursor-pointer ${
        isSelected ? "border-primary-yellow" : "border-black/20"
      }`}
    >
      <div
        className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          isSelected ? "border-transparent bg-primary-yellow" : "border-black/20"
        }`}
      >
        {isSelected && <Icon name="Check" size={16} className="text-white" />}
      </div>
      <span>{text}</span>
    </button>
  );
}
