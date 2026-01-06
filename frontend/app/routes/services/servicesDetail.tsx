import Icon from "~/components/icon";
import { Link, useLoaderData } from "react-router";
import AvatarHeader from "../../components/AvatarHeader";
import { apiFetch } from "~/lib/apiFetch";
import type { MetaFunction } from "react-router";
import ServicesDetailContent from "./components/ServicesDetailContent";
import ServicesReviews from "./components/ServicesReviews";

export const meta: MetaFunction = ({ matches }) => {
  const routeData = matches.find((match: any) => match.id === "routes/services/servicesDetail")?.loaderData as any;
  const serviceTitle = routeData?.service?.title ?? "Service";
  const userName = routeData?.service?.user?.name ?? "User";

  return [
    { title: `${serviceTitle}: A service provided by ${userName} | LineUp` },
    {
      property: "og:title",
      content: `${serviceTitle}: A service provided by ${userName} | LineUp`,
    },
  ];
};

export async function clientLoader({ params }: { params: { serviceId: string } }): Promise<{}> {
  const servicesResponse = await apiFetch(`/services/${params.serviceId}`);

  if (servicesResponse.status === 404) {
    throw new Response("Service not Found", { status: 404 });
  }

  if (!servicesResponse.ok) {
    throw new Error(`Failed to load service: ${servicesResponse.status}`);
  }

  const result = await servicesResponse.json();

  const reviewsResponse = await apiFetch(`/services/${params.serviceId}/reviews`);

  if (!reviewsResponse.ok) {
    throw new Error(`Failed to load reviews: ${reviewsResponse.status}`);
  }

  const reviewsResult = await reviewsResponse.json();

  return { service: result.data, reviews: reviewsResult.data.reviews, avg_rating: reviewsResult.data.avg_rating };
}

export default function ServicesDetail() {
  const { service, reviews, avg_rating } = useLoaderData();

  return (
    <div className="p-4 outer-wrapper">
      <div className="flex items-center justify-between mb-4">
        <Link to={`/profile/${service.user.id}`}>
          <AvatarHeader imageUrl={service.user.profile_image} imageSize={40} title={service.user.name} color="black" />
        </Link>

        <span className="text-lightgrey">#{service.category}</span>
        <div>
          <Icon name="BookmarkEmpty" size={24}></Icon>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ServicesDetailContent service={service} />
        <ServicesReviews reviews={reviews} avg_rating={avg_rating} />
      </div>
    </div>
  );
}
