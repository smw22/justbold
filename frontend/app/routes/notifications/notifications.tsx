import Notification from "~/components/Notification";
import type { NotificationType } from "~/types/notification";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Notifications | LineUp" },
    {
      property: "og:title",
      content: "Notifications | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

export default function Notifications() {
  const mockData: NotificationType[] = [
    {
      id: "1",
      object_id: "blababla",
      object_type: "connection",
      is_read: false,
      created: new Date("2025-12-02T12:36:09"),
      user_id: "Julia Murphy",
    },
    {
      id: "2",
      object_id: "blababla",
      object_type: "collaboration",
      is_read: false,
      created: new Date("2025-12-02T12:36:09"),
      user_id: "Elaine Anderson",
    },
    {
      id: "3",
      object_id: "blababla",
      object_type: "post_like",
      is_read: false,
      created: new Date("2025-12-02T12:36:09"),
      user_id: "Dr. Mario Jakubowski",
    },
    {
      id: "4",
      object_id: "blababla",
      object_type: "post_repost",
      is_read: true,
      created: new Date("2025-12-02T12:36:09"),
      user_id: "Dr. Mario Jakubowski",
    },
    {
      id: "5",
      object_id: "blababla",
      object_type: "post_comment",
      is_read: true,
      created: new Date("2025-12-02T12:36:09"),
      user_id: "Dr. Mario Jakubowski",
    },
  ];
  return (
    <div className="outer-wrapper">
      <article className="p-4 flex flex-col gap-4">
        <section className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Connection requests</p>
          {mockData
            .filter((x) => x.object_type === "connection")
            .map((notification) => (
              <Notification notification={notification} key={notification.id} />
            ))}
        </section>
        <section className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Collaboration requests</p>
          {mockData
            .filter((x) => x.object_type === "collaboration")
            .map((notification) => (
              <Notification notification={notification} key={notification.id} />
            ))}
        </section>
        <section className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Post interactions</p>
          {mockData
            .filter((x) => x.object_type.includes("post"))
            .map((notification) => (
              <Notification notification={notification} key={notification.id} />
            ))}
        </section>
      </article>
    </div>
  );
}
