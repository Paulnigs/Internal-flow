import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { JobStatus } from "@prisma/client";
import { formatMoney } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";

export default async function TalentDashboardPage() {
  const session = await requireRole(["TALENT"]);
  const userId = session.user.id;

  const [activeJob, completedCount, openJobs] = await Promise.all([
    prisma.job.findFirst({
      where: {
        claimedById: userId,
        status: { in: [JobStatus.CLAIMED, JobStatus.SUBMITTED, JobStatus.REJECTED] },
      },
    }),
    prisma.job.count({
      where: { claimedById: userId, status: JobStatus.APPROVED },
    }),
    prisma.job.count({
      where: {
        status: JobStatus.OPEN,
        OR: [{ teamId: null }, ...(session.user.teamId ? [{ teamId: session.user.teamId }] : [])],
      },
    }),
  ]);

  const earned = await prisma.job.aggregate({
    where: { claimedById: userId, status: JobStatus.APPROVED },
    _sum: { rewardCents: true },
  });

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
          <p className="text-display-lg text-on-surface mt-sm">
            {formatMoney(earned._sum.rewardCents ?? 0)}
          </p>
        </div>
        <div className="glass-panel p-md rounded-lg">
          <span className="text-label-caps text-on-surface-variant">Approved Jobs</span>
          <p className="text-display-lg text-on-surface mt-sm">{completedCount}</p>
        </div>
        <div className="glass-panel p-md rounded-lg">
          <span className="text-label-caps text-on-surface-variant">Open Opportunities</span>
          <p className="text-display-lg text-on-surface mt-sm">{openJobs}</p>
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
      ) : (
        <div className="glass-panel p-lg rounded-lg mb-lg text-on-surface-variant text-body-sm">
          No active job — visit the{" "}
          <Link href="/talent/board" className="text-primary hover:underline">
            Live Board
          </Link>{" "}
          to claim a mission.
        </div>
      )}

      <Link
        href="/talent/board"
        className="inline-flex items-center gap-2 text-label-caps text-primary-container hover:underline"
      >
        Go to Live Board →
      </Link>
    </div>
  );
}
