import { formatMoney } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";
import { format } from "date-fns";

const HISTORY = [
  {
    title: "Brand Film Assembly",
    rewardCents: 89000,
    submittedAt: new Date(),
    status: "APPROVED" as const,
    feedback: "Approved — excellent pacing.",
  },
  {
    title: "Social Cuts Pack",
    rewardCents: 45000,
    submittedAt: new Date(Date.now() - 86400000 * 3),
    status: "PENDING" as const,
    feedback: null,
  },
];

export default async function SubmissionHistoryPage() {
  return (
    <div className="p-lg max-w-[1000px] mx-auto">
      <h1 className="text-display-lg text-on-surface mb-lg">Submission History</h1>
      <div className="flex flex-col gap-md">
        {HISTORY.map((item) => (
          <article key={item.title} className="glass-panel rounded-lg p-md">
            <div className="flex justify-between items-start gap-md">
              <div>
                <h2 className="text-headline-md text-on-surface">{item.title}</h2>
                <p className="text-mono-data text-on-surface-variant mt-1">
                  {formatMoney(item.rewardCents)} · {format(item.submittedAt, "MMM d, yyyy")}
                </p>
              </div>
              <StatusBadge status={item.status} />
            </div>
            {item.feedback && (
              <p className="mt-md text-body-sm text-on-surface-variant border-t border-outline-variant/20 pt-md">
                {item.feedback}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
