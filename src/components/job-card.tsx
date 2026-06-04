import Link from "next/link";
import { formatDeadline, formatMoney } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";
import { Icon } from "@/components/icon";
import { ClaimJobButton } from "@/components/claim-job-button";
import type { JobCategory, JobPriority, JobStatus } from "@/lib/types";

export type JobCardData = {
  id: string;
  title: string;
  description: string;
  rewardCents: number;
  deadline: Date;
  status: JobStatus;
  priority: JobPriority;
  category: JobCategory;
  team?: { name: string } | null;
};

export function JobCard({
  job,
  showClaim,
}: {
  job: JobCardData;
  showClaim?: boolean;
}) {
  const { label, urgent } = formatDeadline(new Date(job.deadline));

  return (
    <article className="glass-panel p-panel-padding rounded-lg flex flex-col gap-md group hover:border-primary/50 transition-all">
      <div className="flex justify-between items-start gap-sm">
        <div className="p-2 bg-surface-container-highest rounded border border-outline-variant/20">
          <Icon name="movie_filter" className="text-primary" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-mono-data text-primary-container font-bold text-lg">
            {formatMoney(job.rewardCents)}
          </span>
          <StatusBadge status={job.status} />
        </div>
      </div>
      <div>
        <h3 className="text-headline-md text-on-surface group-hover:text-primary transition-colors">
          {job.title}
        </h3>
        <p className="text-body-sm text-on-surface-variant mt-1 line-clamp-2">
          {job.description}
        </p>
        {job.team && (
          <p className="text-label-caps text-on-surface-variant mt-2 opacity-70">
            Team: {job.team.name}
          </p>
        )}
      </div>
      <div className="mt-auto pt-md border-t border-outline-variant/10 flex flex-col gap-sm">
        <div className="flex justify-between items-center text-mono-data">
          <span className="text-on-surface-variant">Deadline</span>
          <span className={urgent ? "text-error font-bold" : "text-success font-bold"}>
            {label}
          </span>
        </div>
        {showClaim && job.status === "OPEN" ? (
          <ClaimJobButton jobId={job.id} />
        ) : job.status === "CLAIMED" ? (
          <Link
            href={`/talent/workspace/${job.id}`}
            className="w-full bg-surface-container-high text-on-surface py-2 rounded text-label-caps text-center hover:bg-surface-container-highest transition-colors"
          >
            Open Workspace
          </Link>
        ) : null}
      </div>
    </article>
  );
}
