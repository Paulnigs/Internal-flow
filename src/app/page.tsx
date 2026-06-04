import Link from "next/link";
import { Icon } from "@/components/icon";
import { PREVIEW_ROUTES } from "@/lib/preview-routes";

const groups = ["Auth", "Admin", "Talent", "Lead", "Shared"] as const;

export default function PreviewHubPage() {
  return (
    <div className="min-h-screen p-lg relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-tertiary-container/5 rounded-full blur-[150px]" />
      </div>

      <main className="relative z-10 max-w-[1100px] mx-auto">
        <div className="mb-xl">
          <span className="text-primary text-label-caps">STUDIO_PRO</span>
          <h1 className="text-display-lg text-on-surface mt-xs">Screen Preview</h1>
          <p className="text-body-sm text-on-surface-variant mt-sm max-w-[520px]">
            Static UI mock — open any screen below. No database, no authentication.
          </p>
        </div>

        <div className="flex flex-col gap-xl">
          {groups.map((group) => (
            <section key={group}>
              <h2 className="text-label-caps text-primary mb-md">{group}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {PREVIEW_ROUTES.filter((r) => r.group === group).map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="glass-panel rounded-lg p-md flex items-center gap-md hover:border-primary/40 transition-all group"
                  >
                    <div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center">
                      <Icon
                        name={route.icon}
                        className="text-primary group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div>
                      <p className="text-body-sm text-on-surface font-medium">{route.label}</p>
                      <p className="text-mono-data text-on-surface-variant/70 text-[12px]">
                        {route.href}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-xl text-center text-body-sm text-on-surface-variant">
          Tip: use the sidebar on any dashboard screen to jump between pages.
        </p>
      </main>
    </div>
  );
}
