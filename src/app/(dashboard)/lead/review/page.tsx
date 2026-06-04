import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { formatMoney } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";
import { formatDistanceToNow } from "date-fns";

export default async function ReviewQueuePage() {
  const session = await requireRole(["ADMIN", "TEAM_LEAD"]);

  const where =
    session.user.role === "TEAM_LEAD"
      ? {
          status: "PENDING" as const,
          job: { team: { leadId: session.user.id } },
        }
      : { status: "PENDING" as const };

  const submissions = await prisma.submission.findMany({
    where,
    include: {
      job: { include: { claimedBy: true, team: true } },
    },
    orderBy: { submittedAt: "asc" },
  });

  return (
    <div className="p-lg max-w-[1200px] mx-auto">
      <h1 className="text-display-lg text-on-surface mb-1">Review Queue</h1>
      <p className="text-body-sm text-on-surface-variant mb-lg">
        {submissions.length} pending review
      </p>

      <div className="flex flex-col gap-md">
        {submissions.map((sub) => (
          <Link
            key={sub.id}
            href={`/lead/review/${sub.id}`}
            className="glass-panel rounded-lg p-md hover:border-primary/40 transition-colors block"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-headline-md text-on-surface">{sub.job.title}</h2>
                <p className="text-body-sm text-on-surface-variant mt-1">
                  {sub.job.claimedBy?.name} · {sub.job.team?.name ?? "Open market"} ·{" "}
                  {formatMoney(sub.job.rewardCents)}
                </p>
              </div>
              <div className="text-right">
                <StatusBadge status="PENDING" />
                <p className="text-mono-data text-on-surface-variant mt-1">
                  {formatDistanceToNow(sub.submittedAt, { addSuffix: true })}
                </p>
              </div>
            </div>
          </Link>
        ))}
        {submissions.length === 0 && (
          <p className="text-on-surface-variant glass-panel p-lg rounded-lg text-center">
            Queue is clear — no submissions awaiting review.
          </p>
        )}
      </div>
    </div>
  );
}
