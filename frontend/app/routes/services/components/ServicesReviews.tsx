import SheetView from "~/components/SheetView";
import type { ReviewType } from "~/types/review";
import ReviewStars from "./ReviewStars";
import { useState } from "react";

export default function ServicesReviews({ reviews, avg_rating }: { reviews: ReviewType[]; avg_rating: number }) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <div>
      <span className="font-bold">Previous reviews: </span>
      {reviews && reviews.length > 0 ? (
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex gap-4">
            <ReviewStars rating={avg_rating} />
            <span>{reviews.length} reviews</span>
          </div>
          <p className="text-sm">
            "{reviews[0]?.content}" - {reviews[0]?.sender?.name ?? "Anonymous"}
          </p>
          <button
            className="font-bold underline text-left hover:opacity-40 transition-opacity duration-200 ease-in-out"
            onClick={() => setShowAllReviews(true)}
          >
            See more
          </button>
          <SheetView show={showAllReviews} onClose={() => setShowAllReviews(false)} title="All reviews">
            {reviews.map((review: ReviewType) => (
              <div key={review.id} className="flex flex-col gap-8 items-start my-2">
                <div className="flex flex-col gap-2 items-start">
                  <ReviewStars rating={review.rating} />
                  <p>"{review.content}"</p>
                  <p className="text-sm text-neutral-grey">
                    {review.sender?.name ?? "Anonymous"} · {new Date(review.created).toLocaleDateString("da-DK")}
                  </p>
                </div>
              </div>
            ))}
          </SheetView>
        </div>
      ) : (
        <p className="text-sm text-neutral-grey mt-2">No reviews yet.</p>
      )}
    </div>
  );
}
