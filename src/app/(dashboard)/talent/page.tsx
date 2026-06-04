import Link from "next/link";
import { MOCK_JOBS } from "@/lib/mock-data";
import { formatMoney } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";

export default async function TalentDashboardPage() {
  const activeJob = MOCK_JOBS.find((j) => j.status === "CLAIMED");

  return (
    <div className="p-lg max-w-[1600px] mx-auto">
      <div className="mb-lg">
        <div className="flex items-center gap-sm mb-xs">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-label-caps text-success">Available</span>
        </div>
        <h1 className="text-display-lg text-on-surface">Editor Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-lg">
        <div className="glass-panel p-md rounded-lg border-t-2 border-primary-container">
          <span className="text-label-caps text-on-surface-variant">Total Earned</span>
          <p className="text-display-lg text-on-surface mt-sm">$1,250.00</p>
        </div>
        <div className="glass-panel p-md rounded-lg">
          <span className="text-label-caps text-on-surface-variant">Approved Jobs</span>
          <p className="text-display-lg text-on-surface mt-sm">3</p>
        </div>
        <div className="glass-panel p-md rounded-lg">
          <span className="text-label-caps text-on-surface-variant">Open Opportunities</span>
          <p className="text-display-lg text-on-surface mt-sm">
            {MOCK_JOBS.filter((j) => j.status === "OPEN").length}
          </p>
        </div>
      </div>

      {activeJob ? (
        <div className="glass-panel p-lg rounded-lg mb-lg">
          <div className="flex justify-between items-start gap-md">
            <div>
              <p className="text-label-caps text-primary mb-1">Active Mission</p>
              <h2 className="text-headline-md text-on-surface">{activeJob.title}</h2>
              <StatusBadge status={activeJob.status} />
            </div>
            <Link
              href={`/talent/workspace/${activeJob.id}`}
              className="px-md py-sm bg-primary-container text-on-primary-fixed text-label-caps rounded amber-glow"
            >
              Open Workspace
            </Link>
          </div>
        </div>
      ) : null}

      <Link
        href="/talent/board"
        className="inline-flex items-center gap-2 text-label-caps text-primary-container hover:underline"
      >
        Go to Live Board →
      </Link>
    </div>
  );
}
