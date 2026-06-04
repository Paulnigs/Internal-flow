"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { SIDEBAR_ROUTES } from "@/lib/preview-routes";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 z-40 bg-surface-container-low border-r border-outline-variant/20 flex flex-col p-panel-padding gap-xs">
      <div className="px-md py-lg mb-md">
        <Link href="/" className="flex items-center gap-sm mb-xs group">
          <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center">
            <Icon name="terminal" filled className="text-on-primary-container text-[20px]" />
          </div>
          <h1 className="text-headline-md font-bold text-primary group-hover:underline">
            Control Room
          </h1>
        </Link>
        <p className="text-label-caps text-on-surface-variant opacity-70">UI Preview</p>
      </div>

      <nav className="flex-1 flex flex-col gap-xs overflow-y-auto">
        {SIDEBAR_ROUTES.map((item) => {
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
              className={`flex items-center gap-3 rounded-lg px-md py-sm transition-all shrink-0 ${
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

      <div className="mt-auto px-md pb-md pt-sm border-t border-outline-variant/20">
        <Link
          href="/"
          className="flex items-center gap-3 text-on-surface-variant hover:text-primary text-label-caps py-xs"
        >
          <Icon name="apps" className="text-[20px]" />
          All Screens
        </Link>
      </div>
    </aside>
  );
}
