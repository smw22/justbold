import Button from "~/components/Button";
import Icon from "~/components/icon";
import ReviewStars from "./components/ReviewStars";
import { Link, useLoaderData } from "react-router";
import AvatarHeader from "./components/AvatarHeader";

export async function clientLoader({
  params,
}: {
  params: { serviceId: string };
}): Promise<{}> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/services/${params.serviceId}`
  );

  if (response.status === 404) {
    throw new Response("Service not Found", { status: 404 });
  }

  if (!response.ok) {
    throw new Error(`Failed to load service: ${response.status}`);
  }

  const result = await response.json();

  return { service: result.data };
}

export default function ServicesDetail() {
  const { service } = useLoaderData();

  const reviewsAvg = 3.6;

  return (
    <div className=" p-4 outer-wrapper">
      <div className="flex items-center justify-between mb-4">
        <AvatarHeader
          imageUrl={service.user.profile_image}
          imageSize={40}
          title={service.user.name}
        />

        <span className="text-lightgrey">#{service.tag.title}</span>
        <div>
          <Icon name="BookmarkEmpty" size={24}></Icon>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <img
          src={service.media}
          alt={service.title}
          className="w-full rounded-2xl"
        />
        <p>{service.content}</p>
        <Button
          variant="primary"
          text="Start a chat"
          icon="ChatLines"
          fullWidth={false}
        />
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
          <div className="flex gap-4">
            <ReviewStars rating={reviewsAvg} />
            <span>36 reviews</span>
          </div>
        </div>
        <div>
          <p>
            "She made an amazing album cover that perfectly captured our band's
            vibe." - Alex P.
          </p>
          <Link to="/" className="font-bold underline">
            See more
          </Link>
        </div>
      </div>
    </div>
  );
}
