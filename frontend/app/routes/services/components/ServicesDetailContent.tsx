import { Link } from "react-router";
import Button from "~/components/Button";
import type { Service } from "~/types/services/servicesProps";

export default function ServicesDetailContent({ service }: { service: Service }) {
  return (
    <div className="flex flex-col gap-4">
      <h1>{service.title}</h1>
      <div className="w-full h-64 bg-gray-200 rounded-3xl overflow-hidden">
        {service.media && <img src={service.media} alt={service.title} className="w-full h-full object-cover" />}
      </div>
      <p>{service.content}</p>

      {/* NOTE - The service id is added as a param for future reference if we add group chats or specific collaboration chats. */}
      <Link to={`/chats/new?serviceId=${service.id}&userId=${service.user.id}`}>
        <Button variant="primary" text="Start Chat" icon="ChatLines" fullWidth={false} />
      </Link>
      <div>
        <span className="font-bold">Location: </span>
        <span>{service.location}</span>
      </div>

      <div>
        <span className="font-bold">Price: </span>
        <span>€{service.price}</span>
      </div>
    </div>
  );
}
