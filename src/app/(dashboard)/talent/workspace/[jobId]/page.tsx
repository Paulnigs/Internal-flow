import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { formatMoney, formatDeadline } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";
import { SubmitJobForm } from "@/components/submit-job-form";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const session = await requireSession();
  const { jobId } = await params;

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { submission: true, team: true },
  });
  if (!job) notFound();

  const canEdit =
    session.user.role === "TALENT" && job.claimedById === session.user.id;
  const canView =
    canEdit ||
    session.user.role === "ADMIN" ||
    (session.user.role === "TEAM_LEAD" && job.team?.leadId === session.user.id);

  if (!canView) redirect("/");

  const dl = formatDeadline(job.deadline);

  return (
    <div className="p-lg max-w-[1200px] mx-auto">
      <div className="mb-lg">
        <p className="text-label-caps text-on-surface-variant mb-1">Active Workspace</p>
        <h1 className="text-headline-md text-on-surface">{job.title}</h1>
        <div className="flex flex-wrap gap-sm mt-2 items-center">
          <StatusBadge status={job.status} />
          <span className="text-mono-data text-primary-container">{formatMoney(job.rewardCents)}</span>
          <span className={`text-mono-data ${dl.urgent ? "text-error" : "text-on-surface-variant"}`}>
            {dl.label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 flex flex-col gap-gutter">
          <section className="glass-panel rounded-lg p-lg">
            <h2 className="text-label-caps text-primary mb-md">Creative Brief</h2>
            <p className="text-body-sm text-on-surface whitespace-pre-wrap">
              {job.brief || job.description}
            </p>
          </section>
          <section className="glass-panel rounded-lg p-lg min-h-[200px] flex items-center justify-center bg-surface-container-lowest">
            <p className="text-on-surface-variant text-body-sm text-center">
              Preview panel — attach deliverable URL on submit.
              <br />
              <span className="text-mono-data text-[12px]">ProRes / MP4 upload via link in Phase 2</span>
            </p>
          </section>
        </div>

        <aside className="flex flex-col gap-gutter">
          <section className="glass-panel rounded-lg p-md">
            <h2 className="text-label-caps mb-sm">Production Log</h2>
            {job.submission?.feedback && (
              <div className="p-sm bg-error/10 border border-error/30 rounded mb-sm">
                <p className="text-label-caps text-error mb-1">Lead Feedback</p>
                <p className="text-body-sm">{job.submission.feedback}</p>
              </div>
            )}
            <p className="text-body-sm text-on-surface-variant">
              Status: {job.submission?.status ?? "Not submitted"}
            </p>
          </section>

          {canEdit && (job.status === "CLAIMED" || job.status === "REJECTED") && (
            <SubmitJobForm jobId={job.id} />
          )}
        </aside>
      </div>
    </div>
  );
}
