import Button from "~/components/Button";
import Icon from "~/components/icon";
import ReviewStars from "./components/ReviewStars";
import { Link, useLoaderData } from "react-router";
import AvatarHeader from "./components/AvatarHeader";
import { useState } from "react";
import SheetView from "~/components/SheetView";
import type { ReviewType } from "~/types/review";

export async function clientLoader({ params }: { params: { serviceId: string } }): Promise<{}> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const servicesResponse = await fetch(`${apiUrl}/services/${params.serviceId}`);

  if (servicesResponse.status === 404) {
    throw new Response("Service not Found", { status: 404 });
  }

  if (!servicesResponse.ok) {
    throw new Error(`Failed to load service: ${servicesResponse.status}`);
  }

  const result = await servicesResponse.json();

  const reviewsResponse = await fetch(`${apiUrl}/services/${params.serviceId}/reviews`);

  if (!reviewsResponse.ok) {
    throw new Error(`Failed to load reviews: ${reviewsResponse.status}`);
  }

  const reviewsResult = await reviewsResponse.json();

  return { service: result.data, reviews: reviewsResult.data.reviews, avg_rating: reviewsResult.data.avg_rating };
}

export default function ServicesDetail() {
  const { service, reviews, avg_rating } = useLoaderData();
  const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <div className=" p-4 outer-wrapper">
      <div className="flex items-center justify-between mb-4">
        <AvatarHeader imageUrl={service.user.profile_image} imageSize={40} title={service.user.name} />

        <span className="text-lightgrey">#{service.tag.title}</span>
        <div>
          <Icon name="BookmarkEmpty" size={24}></Icon>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1>{service.title}</h1>
        <img src={service.media} alt={service.title} className="w-full rounded-2xl" />
        <p>{service.content}</p>
        <Link to="/chat">
          <Button variant="primary" text="Start a chat" icon="ChatLines" fullWidth={false} />
        </Link>
        <div>
          <span className="font-bold">Location: </span>
          <span>{service.location}</span>
        </div>

        <div>
          <span className="font-bold">Price: </span>
          <span>€{service.price}</span>
        </div>

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
      </div>
    </div>
  );
}
