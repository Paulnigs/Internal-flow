import { requireRole } from "@/lib/session";
import { getSubmissionById } from "@/lib/mock-data";
import { formatMoney } from "@/lib/format";
import { ReviewForm } from "@/components/review-form";

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole(["ADMIN", "TEAM_LEAD"]);
  const { id } = await params;
  const submission = getSubmissionById(id);

  return (
    <div className="p-lg max-w-[1200px] mx-auto">
      <h1 className="text-headline-md text-on-surface mb-lg">{submission.job.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mb-lg">
        <section className="glass-panel rounded-lg p-lg">
          <h2 className="text-label-caps text-primary mb-md">Editor Submission</h2>
          {submission.deliverableUrl && (
            <a
              href={submission.deliverableUrl}
              target="_blank"
              rel="noreferrer"
              className="text-tertiary hover:underline text-body-sm break-all"
            >
              {submission.deliverableUrl}
            </a>
          )}
          {submission.notes && (
            <p className="mt-md text-body-sm text-on-surface whitespace-pre-wrap">
              {submission.notes}
            </p>
          )}
        </section>

        <section className="glass-panel rounded-lg p-lg">
          <h2 className="text-label-caps text-tertiary mb-md">Technical Specs</h2>
          <ul className="text-body-sm text-on-surface-variant space-y-2">
            <li>Reward: {formatMoney(submission.job.rewardCents)}</li>
            <li>Priority: {submission.job.priority}</li>
            <li>Category: {submission.job.category}</li>
          </ul>
        </section>
      </div>

      <ReviewForm submissionId={submission.id} />
    </div>
  );
}
