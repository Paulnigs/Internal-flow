import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { formatMoney } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";
import { format } from "date-fns";

export default async function SubmissionHistoryPage() {
  const session = await requireRole(["TALENT"]);

  const jobs = await prisma.job.findMany({
    where: {
      claimedById: session.user.id,
      status: { in: ["SUBMITTED", "APPROVED", "REJECTED"] },
    },
    include: { submission: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="p-lg max-w-[1000px] mx-auto">
      <h1 className="text-display-lg text-on-surface mb-lg">Submission History</h1>
      <div className="flex flex-col gap-md">
        {jobs.map((job) => (
          <article key={job.id} className="glass-panel rounded-lg p-md">
            <div className="flex justify-between items-start gap-md">
              <div>
                <h2 className="text-headline-md text-on-surface">{job.title}</h2>
                <p className="text-mono-data text-on-surface-variant mt-1">
                  {formatMoney(job.rewardCents)} ·{" "}
                  {job.submission?.submittedAt
                    ? format(job.submission.submittedAt, "MMM d, yyyy")
                    : "—"}
                </p>
              </div>
              <StatusBadge status={job.submission?.status ?? job.status} />
            </div>
            {job.submission?.feedback && (
              <p className="mt-md text-body-sm text-on-surface-variant border-t border-outline-variant/20 pt-md">
                {job.submission.feedback}
              </p>
            )}
          </article>
        ))}
        {jobs.length === 0 && (
          <p className="text-on-surface-variant">No submissions yet.</p>
        )}
      </div>
    </div>
  );
}
