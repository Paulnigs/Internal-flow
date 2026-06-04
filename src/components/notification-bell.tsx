"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { formatDistanceToNow } from "date-fns";

type Item = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
};

export function NotificationBell({
  items: initialItems,
  unread: initialUnread,
}: {
  items: Item[];
  unread: number;
}) {
  const [items, setItems] = useState(initialItems);
  const unread = items.filter((n) => !n.read).length;

  function markRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <details className="relative group">
      <summary className="list-none cursor-pointer w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high/50 rounded-full relative">
        <Icon name="notifications" className="text-[20px]" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-container text-on-primary-fixed text-[9px] font-bold rounded-full flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </summary>
      <div className="absolute right-0 mt-2 w-80 glass-panel rounded-lg shadow-2xl z-50 overflow-hidden">
        <div className="flex items-center justify-between px-md py-sm border-b border-outline-variant/20">
          <span className="text-label-caps text-on-surface">Notifications</span>
          {unread > 0 && (
            <button
              type="button"
              className="text-[10px] text-primary hover:underline"
              onClick={markAllRead}
            >
              Mark all read
            </button>
          )}
        </div>
        <ul className="max-h-72 overflow-y-auto">
          {items.length === 0 ? (
            <li className="px-md py-lg text-body-sm text-on-surface-variant text-center">
              No notifications
            </li>
          ) : (
            items.map((n) => (
              <li
                key={n.id}
                className={`px-md py-sm border-b border-outline-variant/10 ${
                  !n.read ? "bg-primary-container/5" : ""
                }`}
              >
                <button
                  type="button"
                  className="text-left w-full"
                  onClick={() => !n.read && markRead(n.id)}
                >
                  <p className="text-label-caps text-on-surface">{n.title}</p>
                  <p className="text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">
                    {n.message}
                  </p>
                  <p className="text-mono-data text-on-surface-variant/60 mt-1">
                    {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                  </p>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </details>
  );
}
