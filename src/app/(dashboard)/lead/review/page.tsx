import Link from "next/link";
import { MOCK_SUBMISSIONS } from "@/lib/mock-data";
import { formatMoney } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";
import { formatDistanceToNow } from "date-fns";

export default async function ReviewQueuePage() {
  return (
    <div className="p-lg max-w-[1200px] mx-auto">
      <h1 className="text-display-lg text-on-surface mb-1">Review Queue</h1>
      <p className="text-body-sm text-on-surface-variant mb-lg">
        {MOCK_SUBMISSIONS.length} pending (preview)
      </p>

      <div className="flex flex-col gap-md">
        {MOCK_SUBMISSIONS.map((sub) => (
          <Link
            key={sub.id}
            href={`/lead/review/${sub.id}`}
            className="glass-panel rounded-lg p-md hover:border-primary/40 transition-colors block"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-headline-md text-on-surface">{sub.job.title}</h2>
                <p className="text-body-sm text-on-surface-variant mt-1">
                  {sub.job.claimedBy?.name} · {formatMoney(sub.job.rewardCents)}
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
      </div>
    </div>
  );
}
