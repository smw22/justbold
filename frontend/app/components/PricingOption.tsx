interface PricingOptionProps {
  title: string;
  price: string;
  period: string;
  badge?: string;
  savingsLabel?: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function PricingOption({
  title,
  price,
  period,
  badge,
  savingsLabel,
  isSelected,
  onClick,
}: PricingOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`relative cursor-pointer flex items-center gap-4 w-[273px] px-2 py-5 rounded-3xl border transition-all duration-300 ${
        isSelected ? "border-primary-yellow" : "border-neutral-grey"
      }`}
    >
      {badge && (
        <div className="absolute text-sm -top-3 left-6 bg-primary-yellow text-black font-bold px-2 py-1 rounded">
          {badge}
        </div>
      )}
      <div
        className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
          isSelected ? "bg-primary-yellow border-transparent" : "border-black"
        }`}
      ></div>
      <div className="flex-1 text-left">
        <div className="font-bold">{title}</div>
        <div className="text-black">{period}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold">{price}</div>
        {savingsLabel && (
          <div className="bg-primary-yellow text-black text-sm font-medium px-2 py-1">
            {savingsLabel}
          </div>
        )}
      </div>
    </button>
  );
}
