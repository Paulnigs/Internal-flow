import Link from "next/link";
import { MOCK_JOBS } from "@/lib/mock-data";
import { formatMoney, formatDeadline } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = "all" } = await searchParams;

  const jobs = MOCK_JOBS.filter((job) => {
    if (tab === "open") return job.status === "OPEN";
    if (tab === "claimed") return job.status === "CLAIMED";
    if (tab === "critical") return job.priority === "CRITICAL";
    return true;
  });

  const tabs = [
    { id: "all", label: "All" },
    { id: "open", label: "Open" },
    { id: "claimed", label: "Claimed" },
    { id: "critical", label: "Critical" },
  ];

  return (
    <div className="p-lg max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
        <div>
          <h1 className="text-display-lg text-on-surface">Job Management</h1>
          <p className="text-body-sm text-on-surface-variant">UI preview — static jobs</p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="px-md py-sm bg-primary-container text-on-primary-fixed text-label-caps rounded amber-glow"
        >
          + New Job
        </Link>
      </div>

      <div className="flex gap-sm mb-lg">
        {tabs.map((t) => (
          <Link
            key={t.id}
            href={`/admin/jobs?tab=${t.id}`}
            className={`px-md py-1.5 rounded text-label-caps ${
              tab === t.id
                ? "bg-surface-container-high text-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="glass-panel rounded-lg overflow-hidden">
        <table className="w-full text-body-sm">
          <thead className="bg-surface-container-low">
            <tr className="text-left text-label-caps text-on-surface-variant">
              <th className="p-md">Title</th>
              <th className="p-md">Reward</th>
              <th className="p-md">Deadline</th>
              <th className="p-md">Status</th>
              <th className="p-md">Talent</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const dl = formatDeadline(job.deadline);
              return (
                <tr key={job.id} className="border-t border-outline-variant/10">
                  <td className="p-md">
                    <p className="text-on-surface font-medium">{job.title}</p>
                    <p className="text-on-surface-variant text-[12px] mt-0.5">
                      {job.team?.name ?? "Open market"} · {job.category}
                    </p>
                  </td>
                  <td className="p-md text-mono-data text-primary-container">
                    {formatMoney(job.rewardCents)}
                  </td>
                  <td className={`p-md text-mono-data ${dl.urgent ? "text-error" : ""}`}>
                    {dl.label}
                  </td>
                  <td className="p-md">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="p-md text-on-surface-variant">{job.claimedBy?.name ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
