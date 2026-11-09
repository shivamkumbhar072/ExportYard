import { useContext } from "react";
import NotificationContext from "./notificationContext.js";

export function useNotification() {
  const notify = useContext(NotificationContext);
  if (!notify) {
    throw new Error(
      "useNotification must be used inside NotificationProvider"
    );
  }
  return notify;
}
