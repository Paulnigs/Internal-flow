import Link from "next/link";
import { requireSession, homeForRole } from "@/lib/session";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import { NotificationBell } from "@/components/notification-bell";

export async function AppHeader() {
  const session = await requireSession();
  const notifications = MOCK_NOTIFICATIONS;
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 flex justify-between items-center h-14 px-lg w-full">
      <div className="flex items-center gap-lg">
        <Link
          href={homeForRole(session.user.role)}
          className="text-headline-md font-black tracking-tight text-primary-container"
        >
          STUDIO_PRO
        </Link>
        <span className="hidden md:inline text-label-caps text-on-surface-variant">
          {session.user.name} · {session.user.role.replace("_", " ")}
        </span>
        <span className="hidden lg:inline text-[10px] text-primary/80 uppercase tracking-wider">
          UI Preview
        </span>
      </div>
      <div className="flex items-center gap-md">
        <NotificationBell items={notifications} unread={unread} />
        <div className="w-8 h-8 rounded-full bg-primary-container/30 border border-primary/20 flex items-center justify-center text-label-caps text-primary">
          {session.user.name?.[0] ?? "?"}
        </div>
      </div>
    </header>
  );
}
