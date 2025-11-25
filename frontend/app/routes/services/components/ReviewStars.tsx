import Icon from "~/components/icon";

interface ReviewStarsProps {
  rating?: number;
}

export default function ReviewStars({ rating }: ReviewStarsProps) {
  const filledStars = Math.round(rating || 0); // Rounds down (4.2 → 4)
  const totalStars = 5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }, (_, index) => (
        <Icon
          key={index}
          name="Star"
          size={24}
          className={
            index < filledStars ? "fill-primary-yellow" : "neutral-grey"
          }
        />
      ))}
    </div>
  );
}
