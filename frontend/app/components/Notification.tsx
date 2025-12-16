import type { NotificationType } from "~/types/notification";
import Icon from "./icon";
import Button from "./Button";
import fromNowDate from "~/lib/fromNowDate";

type NotificationVariant = "connection" | "collaboration" | "post_like" | "post_repost" | "post_comment";

export default function Notification({
  notification,
  onAccept,
  isAccepted,
}: {
  notification: NotificationType;
  onAccept?: () => void;
  isAccepted?: boolean;
}) {
  const mockImg = "https://loremflickr.com/640/480?lock=8937661869850624";

  switch (notification.object_type) {
    case "connection":
      return (
        <div className="flex gap-4 items-center p-2">
          <div className={`${!notification.is_read ? "bg-primary-yellow " : ""} w-1 h-10 rounded-tr-xs rounded-br-xs`} />
          <img src={mockImg} className="w-8 h-8 rounded-full bg-black object-cover" alt="profile picture" />
          <div className="gap-1 flex flex-col flex-1">
            <p className="text-sm">
              <span className="font-bold">{notification.user_id}</span> wants to connect.
            </p>

            <p className="text-xs text-gray-500">{fromNowDate({ date: notification.created })}</p>
          </div>
          {onAccept && (
            <Button
              text={isAccepted ? "Connected" : "Accept"}
              variant="secondary-glass"
              disabled={isAccepted}
              onClick={onAccept}
            />
          )}
        </div>
      );
    case "collaboration":
      return (
        <div className="flex gap-4 items-center p-2">
          <div className={`${!notification.is_read ? "bg-primary-yellow " : ""} w-1 h-10 rounded-tr-xs rounded-br-xs`} />
          <img src={mockImg} className="w-8 h-8 rounded-full bg-black object-cover" alt="profile picture" />
          <div className="gap-1 flex flex-col flex-1">
            <p className="text-sm">
              <span className="font-bold">{notification.user_id}</span> wants to collaborate.
            </p>

            <p className="text-xs text-gray-500">{fromNowDate({ date: notification.created })}</p>
          </div>
          <Button text="Reply" variant="secondary-glass" onClick={() => alert("Reply to collab request.")} />
        </div>
      );
    case "post_like":
      return (
        <div className="flex gap-4 items-center hover:bg-gray-200 p-2 rounded-lg transition-colors duration-200 ease-in-out cursor-pointer">
          <div className={`${!notification.is_read ? "bg-primary-yellow " : ""} w-1 h-10 rounded-tr-xs rounded-br-xs`} />
          <img src={mockImg} className="w-8 h-8 rounded-full bg-black object-cover" alt="profile picture" />
          <div className="gap-1 flex flex-col flex-1">
            <p className="text-sm">
              <span className="font-bold">{notification.user_id}</span> liked your post.
            </p>
            <p className="text-xs text-gray-500">{fromNowDate({ date: notification.created })}</p>
          </div>
          <Icon name="Heart" size={24} />
        </div>
      );
    case "post_repost":
      return (
        <div className="flex gap-4 items-center hover:bg-gray-200 p-2 rounded-lg transition-colors duration-200 ease-in-out cursor-pointer">
          <div className={`${!notification.is_read ? "bg-primary-yellow " : ""} w-1 h-10 rounded-tr-xs rounded-br-xs`} />
          <img src={mockImg} className="w-8 h-8 rounded-full bg-black object-cover" alt="profile picture" />
          <div className="gap-1 flex flex-col flex-1">
            <p className="text-sm">
              <span className="font-bold">{notification.user_id}</span> reposted your post.
            </p>
            <p className="text-xs text-gray-500">{fromNowDate({ date: notification.created })}</p>
          </div>
          <Icon name="Repeat21" size={24} />
        </div>
      );
    case "post_comment":
      return (
        <div className="flex gap-4 items-center hover:bg-gray-200 p-2 rounded-lg transition-colors duration-200 ease-in-out cursor-pointer">
          <div className={`${!notification.is_read ? "bg-primary-yellow " : ""} w-1 h-10 rounded-tr-xs rounded-br-xs`} />
          <img src={mockImg} className="w-8 h-8 rounded-full bg-black object-cover" alt="profile picture" />
          <div className="gap-1 flex flex-col flex-1">
            <p className="text-sm">
              <span className="font-bold">{notification.user_id}</span> commented on your post.
            </p>
            <p className="text-xs text-gray-500">{fromNowDate({ date: notification.created })}</p>
          </div>
        </div>
      );
  }
}
