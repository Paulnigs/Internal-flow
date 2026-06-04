import { requireRole } from "@/lib/session";
import { Icon } from "@/components/icon";

type Channel = { id: string; name: string; unread?: boolean; active?: boolean };
type Person = { name: string; status: string; active?: boolean };
type Msg = { who: string; at: string; text: string; highlight?: boolean };

const channels: Channel[] = [
  { id: "general", name: "general", active: true },
  { id: "vfx-support", name: "vfx-support" },
  { id: "render-talk", name: "render-talk", unread: true },
  { id: "color-grading", name: "color-grading" },
  { id: "audio-post", name: "audio-post" },
];

const roster: Person[] = [
  { name: "Marcus Vance", status: "EDITING SCENE 12", active: true },
  { name: "Sarah Connor", status: "MONITORING FARM", active: true },
  { name: "Alex Rivera", status: "REVIEWING CUTS", active: true },
  { name: "David Chen", status: "IDLE (14M)" },
];

const messages: Msg[] = [
  {
    who: "Marcus Vance",
    at: "10:24 AM",
    text: "@team The vFX turnovers for Scene 24 are ready on the NAS. Please ensure we have the latest LUTs applied before the review session at 2 PM. @Sarah, did the render farm finish the proxy generation?",
  },
  {
    who: "Sarah Connor",
    at: "10:26 AM",
    text: "Proxy gen is at 85%. Had a minor bottleneck on Node 4 but we're back on track now. Should be done in 15 mins.",
    highlight: true,
  },
  {
    who: "Alex Rivera",
    at: "10:45 AM",
    text: "Revised edit for the opening sequence. Check out the pacing changes at 01:23:14.",
  },
];

export default async function TeamCommsPage() {
  await requireRole(["ADMIN", "TEAM_LEAD", "TALENT"]);

  return (
    <div className="h-[calc(100vh-56px)] flex">
      {/* Channels */}
      <aside className="w-64 bg-surface-container-lowest/50 border-r border-outline-variant/10 backdrop-blur-xl hidden lg:flex flex-col">
        <div className="p-lg">
          <h2 className="text-label-caps text-on-surface-variant mb-md flex items-center justify-between">
            Channels
            <button
              type="button"
              className="text-on-surface-variant hover:text-primary transition-colors"
              aria-label="Add channel"
            >
              <Icon name="add_circle" className="text-[16px]" />
            </button>
          </h2>
          <div className="space-y-1">
            {channels.map((c) => (
              <div
                key={c.id}
                className={`flex items-center gap-2 px-md py-2 rounded ${
                  c.active
                    ? "bg-surface-container-high text-primary border-l-2 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
                }`}
              >
                <span className="text-on-surface-variant/70">#</span>
                <span className="text-body-sm">{c.name}</span>
                {c.unread && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-error animate-pulse" />
                )}
              </div>
            ))}
          </div>

          <h3 className="text-label-caps text-on-surface-variant mt-xl mb-md">
            Shared Resources
          </h3>
          <div className="space-y-3">
            <Resource icon="menu_book" title="Studio Style Guide" meta="PDF • 12MB" />
            <Resource icon="gradient" title="Master LUTs v4.2" meta="ZIP • 45MB" />
            <Resource icon="link" title="Asset Server (Local)" meta="internal://smb-prod-01" />
          </div>
        </div>
      </aside>

      {/* Chat */}
      <section className="flex-1 flex flex-col bg-surface overflow-hidden relative">
        <header className="h-14 border-b border-outline-variant/10 px-lg flex items-center justify-between shrink-0 bg-surface/50 backdrop-blur-sm">
          <div className="flex items-center gap-md">
            <span className="text-on-surface-variant text-xl font-light">#</span>
            <h1 className="text-headline-md text-on-surface">general</h1>
            <span className="h-4 w-px bg-outline-variant/30 mx-sm" />
            <p className="text-body-sm text-on-surface-variant hidden md:block">
              Central coordination for the Alpha Production cycle.
            </p>
          </div>
          <div className="flex items-center gap-md text-on-surface-variant">
            <button type="button" className="hover:text-on-surface" aria-label="Search">
              <Icon name="search" />
            </button>
            <button type="button" className="hover:text-on-surface" aria-label="Pin">
              <Icon name="push_pin" />
            </button>
            <button type="button" className="hover:text-on-surface" aria-label="Members">
              <Icon name="group" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-lg space-y-md">
          {messages.map((m) => (
            <article
              key={`${m.who}-${m.at}`}
              className={`flex gap-md rounded-lg p-md ${
                m.highlight ? "bg-primary-container/10 border border-primary-container/25" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/20 flex items-center justify-center shrink-0 text-label-caps text-primary">
                {m.who.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-sm mb-1">
                  <span className="font-bold text-on-surface">{m.who}</span>
                  <span className="text-label-caps text-on-surface-variant opacity-60">{m.at}</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed">{m.text}</p>
                {m.highlight && (
                  <div className="mt-sm text-mono-data text-on-surface-variant/70">
                    <span className="text-primary">3 replies</span> · Last reply 5 min ago
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Composer (frontend-only) */}
        <footer className="shrink-0 p-lg border-t border-outline-variant/10 bg-surface/60 backdrop-blur-sm">
          <div className="glass-panel rounded-lg p-sm flex items-center gap-sm">
            <button type="button" className="text-on-surface-variant hover:text-on-surface" aria-label="Attach">
              <Icon name="add" />
            </button>
            <input
              className="flex-1 bg-transparent outline-none text-body-sm text-on-surface placeholder:text-on-surface-variant/60"
              placeholder="Message #general"
            />
            <button
              type="button"
              className="h-9 w-9 rounded bg-primary-container text-on-primary-fixed hover:brightness-110 transition-all flex items-center justify-center"
              aria-label="Send"
            >
              <Icon name="send" className="text-[18px]" />
            </button>
          </div>
          <p className="text-[11px] text-on-surface-variant/60 mt-sm">
            Frontend-only preview (messages are not persisted).
          </p>
        </footer>
      </section>

      {/* Right rail */}
      <aside className="w-80 border-l border-outline-variant/10 bg-surface/60 backdrop-blur-sm hidden xl:flex flex-col">
        <div className="p-lg">
          <div className="flex items-center justify-between mb-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-label-caps text-on-surface-variant">
                Live Roster — {roster.filter((p) => p.active).length} Online
              </span>
            </div>
          </div>

          <div className="space-y-sm">
            {roster.map((p) => (
              <div key={p.name} className="flex items-center gap-md p-sm rounded hover:bg-surface-container-high/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/20 flex items-center justify-center text-label-caps text-primary">
                  {p.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1">
                  <p className="text-body-sm text-on-surface font-medium">{p.name}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wide">
                    {p.status}
                  </p>
                </div>
                {p.active && <span className="w-2 h-2 rounded-full bg-success" />}
              </div>
            ))}
          </div>

          <h3 className="text-label-caps text-on-surface-variant mt-xl mb-md">Shared Media</h3>
          <div className="grid grid-cols-2 gap-sm">
            <MediaCard title="Monitor Rig" />
            <MediaCard title="Lens Kit" />
            <MediaCard title="Suite A" />
            <button
              type="button"
              className="glass-panel rounded-lg aspect-square flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <div className="flex flex-col items-center gap-1">
                <Icon name="grid_view" />
                <span className="text-label-caps">View All</span>
              </div>
            </button>
          </div>

          <div className="mt-xl glass-panel rounded-lg p-md border border-primary-container/20">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-label-caps text-primary-container">Render Farm Health</p>
                <p className="text-body-sm text-on-surface-variant mt-1">Nodes Active</p>
              </div>
              <p className="text-mono-data text-on-surface">12 / 16</p>
            </div>
            <div className="h-1 bg-surface-container rounded-full overflow-hidden mt-sm">
              <div className="h-full bg-primary-container w-3/4" />
            </div>
            <p className="text-[11px] text-on-surface-variant/70 mt-sm">Est. completion: 14:32 PM</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Resource({ icon, title, meta }: { icon: string; title: string; meta: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="flex items-center gap-2 text-body-sm text-on-surface group-hover:text-primary transition-colors">
        <Icon name={icon} className="text-[18px]" />
        <span>{title}</span>
      </div>
      <p className="text-[10px] text-on-surface-variant ml-7 uppercase tracking-tight">{meta}</p>
    </div>
  );
}

function MediaCard({ title }: { title: string }) {
  return (
    <button
      type="button"
      className="glass-panel rounded-lg aspect-square p-sm flex flex-col items-start justify-end text-left hover:border-primary/30 transition-colors"
    >
      <span className="text-label-caps text-on-surface-variant">{title}</span>
    </button>
  );
}

