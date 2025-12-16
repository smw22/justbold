import { useState, useEffect } from "react";
import Notification from "~/components/Notification";
import type { NotificationType } from "~/types/notification";
import type { MetaFunction } from "react-router";
import { apiFetch } from "~/lib/apiFetch";

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
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<any[]>([]);
  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, "pending" | "accepted">>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch connections
        const connectionsRes = await apiFetch("/connections");
        if (connectionsRes.ok) {
          const data = await connectionsRes.json();

          // Set pending requests where current user is the addressee
          const requests = (data.pending ?? []).filter((conn: any) => conn.addressee.id === data.me);
          setConnectionRequests(requests);

          // Build status map
          const statusMap: Record<string, "pending" | "accepted"> = {};
          for (const conn of data.accepted ?? []) {
            const otherId = conn.requester.id === data.me ? conn.addressee.id : conn.requester.id;
            statusMap[otherId] = "accepted";
          }
          for (const conn of data.pending ?? []) {
            const otherId = conn.requester.id === data.me ? conn.addressee.id : conn.requester.id;
            statusMap[otherId] = "pending";
          }
          setConnectionStatuses(statusMap);
        }

        // TODO: Fetch actual notifications from API
        // For now using mock data for other notification types
        const mockData: NotificationType[] = [
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
        setNotifications(mockData);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAcceptConnection = async (connectionId: string, requesterId: string) => {
    try {
      const res = await apiFetch(`/connections/${connectionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "accept" }),
      });

      if (res.ok) {
        setConnectionStatuses((prev) => ({ ...prev, [requesterId]: "accepted" }));
        // Remove from pending requests
        setConnectionRequests((prev) => prev.filter((req) => req.id !== connectionId));
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error("Failed to accept connection:", res.status, errorData);
      }
    } catch (error) {
      console.error("Failed to accept connection:", error);
    }
  };

  if (loading) {
    return (
      <div className="outer-wrapper">
        <div className="p-4 text-sm text-gray-500">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="outer-wrapper">
      <article className="p-4 flex flex-col gap-4">
        {connectionRequests.length > 0 && (
          <section className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">Connection requests</p>
            {connectionRequests.map((request) => {
              const status = connectionStatuses[request.requester.id];
              const isAccepted = status === "accepted";

              return (
                <Notification
                  key={request.id}
                  notification={{
                    id: request.id,
                    object_id: request.id,
                    object_type: "connection",
                    is_read: isAccepted,
                    created: new Date(request.created),
                    user_id: request.requester.name,
                  }}
                  onAccept={isAccepted ? undefined : () => handleAcceptConnection(request.id, request.requester.id)}
                  isAccepted={isAccepted}
                />
              );
            })}
          </section>
        )}

        <section className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Collaboration requests</p>
          {notifications
            .filter((x) => x.object_type === "collaboration")
            .map((notification) => (
              <Notification notification={notification} key={notification.id} />
            ))}
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Post interactions</p>
          {notifications
            .filter((x) => x.object_type.includes("post"))
            .map((notification) => (
              <Notification notification={notification} key={notification.id} />
            ))}
        </section>
      </article>
    </div>
  );
}
