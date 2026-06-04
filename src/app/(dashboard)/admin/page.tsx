import { MOCK_JOBS, MOCK_TEAMS } from "@/lib/mock-data";
import { Icon } from "@/components/icon";

export default async function AdminDashboardPage() {
  const openJobs = MOCK_JOBS.filter((j) => j.status === "OPEN").length;
  const claimedJobs = MOCK_JOBS.filter((j) => j.status === "CLAIMED").length;
  const submittedJobs = 1;
  const talents = 2;
  const teams = MOCK_TEAMS.length;
  const recentJobs = MOCK_JOBS.slice(0, 6);

  const stats = [
    { label: "Open Jobs", value: openJobs, icon: "bolt", accent: "border-primary-container" },
    { label: "In Progress", value: claimedJobs, icon: "movie_edit", accent: "" },
    { label: "Awaiting Review", value: submittedJobs, icon: "rate_review", accent: "" },
    { label: "Talents", value: talents, icon: "groups", accent: "" },
  ];

  return (
    <div className="p-lg max-w-[1600px] mx-auto">
      <div className="mb-lg">
        <h1 className="text-display-lg text-on-surface">Admin Dashboard</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          {teams} teams · UI preview (static data)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter mb-lg">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`glass-panel p-md rounded-lg border-t-2 ${s.accent || "border-outline-variant/30"}`}
          >
            <div className="flex justify-between items-start">
              <span className="text-label-caps text-on-surface-variant">{s.label}</span>
              <Icon name={s.icon} className="text-primary-container" />
            </div>
            <span className="text-display-lg text-on-surface mt-md block">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-lg p-panel-padding">
        <h2 className="text-label-caps mb-md border-b border-outline-variant/20 pb-sm">
          Recent Activity
        </h2>
        <table className="w-full text-body-sm">
          <thead>
            <tr className="text-left text-label-caps text-on-surface-variant border-b border-outline-variant/20">
              <th className="pb-sm pr-md">Job</th>
              <th className="pb-sm pr-md">Status</th>
              <th className="pb-sm pr-md">Assignee</th>
              <th className="pb-sm">Team</th>
            </tr>
          </thead>
          <tbody>
            {recentJobs.map((job) => (
              <tr key={job.id} className="border-b border-outline-variant/10">
                <td className="py-sm pr-md text-on-surface">{job.title}</td>
                <td className="py-sm pr-md text-mono-data">{job.status}</td>
                <td className="py-sm pr-md text-on-surface-variant">
                  {job.claimedBy?.name ?? "—"}
                </td>
                <td className="py-sm text-on-surface-variant">{job.team?.name ?? "Open market"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
