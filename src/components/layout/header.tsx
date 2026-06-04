import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { homeForRole } from "@/lib/session";
import { Icon } from "@/components/icon";
import { NotificationBell } from "@/components/notification-bell";

export async function AppHeader() {
  const session = await requireSession();
  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
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
