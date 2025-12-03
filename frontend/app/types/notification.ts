type NotificationVariant = "connection" | "collaboration" | "post_like" | "post_repost" | "post_comment";
export interface NotificationType {
  id: string;
  object_id: string;
  object_type: NotificationVariant;
  is_read: boolean;
  created: Date;
  user_id: string;
}
