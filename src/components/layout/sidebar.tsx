"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Icon } from "@/components/icon";
import type { Role } from "@/lib/types";

type NavItem = { href: string; label: string; icon: string };

const navByRole: Record<Role, NavItem[]> = {
  ADMIN: [
    { href: "/admin", label: "Overview", icon: "dashboard" },
    { href: "/admin/jobs", label: "Job Mgmt", icon: "dataset" },
    { href: "/comms", label: "Team Comms", icon: "forum" },
    { href: "/admin/teams", label: "Team Mgmt", icon: "group" },
  ],
  TEAM_LEAD: [
    { href: "/lead/review", label: "Review Pool", icon: "rate_review" },
    { href: "/talent/board", label: "Live Board", icon: "dataset" },
    { href: "/comms", label: "Team Comms", icon: "forum" },
  ],
  TALENT: [
    { href: "/talent", label: "Overview", icon: "dashboard" },
    { href: "/talent/board", label: "Live Board", icon: "dataset" },
    { href: "/comms", label: "Team Comms", icon: "forum" },
    { href: "/talent/history", label: "History", icon: "history" },
  ],
};

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = navByRole[role];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 z-40 bg-surface-container-low border-r border-outline-variant/20 flex flex-col p-panel-padding gap-xs">
      <div className="px-md py-lg mb-md">
        <div className="flex items-center gap-sm mb-xs">
          <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center">
            <Icon name="terminal" filled className="text-on-primary-container text-[20px]" />
          </div>
          <h1 className="text-headline-md font-bold text-primary">Control Room</h1>
        </div>
        <p className="text-label-caps text-on-surface-variant opacity-70">STUDIO_PRO</p>
      </div>

      <nav className="flex-1 flex flex-col gap-xs">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (pathname != null &&
              item.href !== "/admin" &&
              item.href !== "/talent" &&
              pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-md py-sm transition-all ${
                active
                  ? "bg-primary-container text-on-primary-container nav-active translate-x-1"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <Icon name={item.icon} filled={active} className="text-[20px]" />
              <span className="text-label-caps">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-xs px-md pb-md">
        {role === "ADMIN" && (
          <Link
            href="/admin/jobs/new"
            className="w-full py-sm bg-primary-container text-on-primary-fixed rounded text-label-caps hover:brightness-110 amber-glow transition-all flex items-center justify-center gap-2 mb-sm"
          >
            <Icon name="add_circle" className="text-[18px]" />
            Create New Job
          </Link>
        )}
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 text-on-surface-variant hover:text-on-surface text-label-caps px-md py-xs"
        >
          <Icon name="logout" className="text-[20px]" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
