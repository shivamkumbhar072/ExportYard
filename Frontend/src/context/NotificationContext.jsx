import {
  useCallback,
  useEffect,
  useState,
} from "react";
import NotificationContext from "./notificationContext.js";

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const notify = useCallback((message, type = "success") => {
    setNotification({ message, type });
  }, []);

  useEffect(() => {
    if (!notification) return undefined;
    const timer = setTimeout(() => setNotification(null), 4000);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      {notification && (
        <div
          className={`fixed right-4 top-4 z-[100] flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg ${
            notification.type === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
          role={notification.type === "error" ? "alert" : "status"}
          aria-live={notification.type === "error" ? "assertive" : "polite"}
        >
          <span className="flex-1">{notification.message}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            aria-label="Dismiss notification"
            className="rounded px-1 text-current opacity-70 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
