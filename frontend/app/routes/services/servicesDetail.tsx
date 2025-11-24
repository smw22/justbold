import Button from "~/components/Button";
import Icon from "~/components/icon";
import ReviewStars from "./components/reviewStarts";
import { Link } from "react-router";

export default function ServicesDetail() {
  const reviewsAvg = 3.6;

  return (
    <div className=" p-4">
      Services Detail
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-[40px] h-[40px]">
            <img
              src="/images/user-avatar.png"
              alt="user avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span>EchoLabs Studio</span>
        </div>

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
