import Button from "~/components/Button";
import Icon from "~/components/icon";
import ReviewStars from "./components/ReviewStarts";
import { Link } from "react-router";
import AvatarHeader from "./components/AvatarHeader";

export default function ServicesDetail() {
  const reviewsAvg = 3.6;

  return (
    <div className=" p-4">
      Services Detail
      <div className="flex items-center justify-between mb-4">
        <AvatarHeader imageSize={40} title="EchoLabs Studio" />

        <span className="text-lightgrey">#recording</span>
        <div>
          <Icon name="BookmarkEmpty" size={24}></Icon>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <img
          src="/images/studio-example.png"
          alt="user avatar"
          className="w-full rounded-2xl"
        />
        <p>
          Album covers, tour posters, and stage visuals crafted to reflect your
          sound and style. Work directly with an artist experienced in branding
          for musicians.
        </p>
        <Button
          variant="primary"
          text="Start a chat"
          icon="ChatLines"
          fullWidth={false}
        />
        <div>
          <span className="font-bold">Location: </span>
          <span>Aarhus</span>
        </div>

        <div>
          <span className="font-bold">Price: </span>
          <span>€100</span>
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
