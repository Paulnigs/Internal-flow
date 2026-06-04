import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { JobStatus } from "@prisma/client";
import { JobCard } from "@/components/job-card";

export default async function TalentJobBoardPage() {
  const session = await requireRole(["ADMIN", "TEAM_LEAD", "TALENT"]);
  const teamId = session.user.teamId;

  const openJobs = await prisma.job.findMany({
    where: {
      status: JobStatus.OPEN,
      OR: [{ teamId: null }, ...(teamId ? [{ teamId }] : [])],
    },
    include: { team: true },
    orderBy: [{ priority: "desc" }, { deadline: "asc" }],
  });

  const teamMissions = openJobs.filter((j) => j.teamId);
  const globalMarket = openJobs.filter((j) => !j.teamId);
  const showClaim = session.user.role === "TALENT";

  return (
    <div className="p-lg max-w-[1600px] mx-auto flex flex-col gap-lg">
      <div>
        <div className="flex items-center gap-sm mb-xs">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-label-caps text-success">Real-time Board</span>
        </div>
        <h1 className="text-display-lg text-on-surface">Talent Job Board</h1>
        <p className="text-on-surface-variant text-body-sm">
          Team missions and global open market — first claim wins.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
          <header className="flex justify-between border-b border-outline-variant/20 pb-sm">
            <h2 className="text-label-caps text-primary tracking-widest">Team Missions</h2>
            <span className="text-mono-data text-on-surface-variant">
              Open: {teamMissions.length}
            </span>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {teamMissions.map((job) => (
              <JobCard key={job.id} job={job} showClaim={showClaim} />
            ))}
            {teamMissions.length === 0 && (
              <p className="text-on-surface-variant col-span-2">No team missions right now.</p>
            )}
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <header className="flex justify-between border-b border-outline-variant/20 pb-sm">
            <h2 className="text-label-caps text-tertiary tracking-widest">Open Market</h2>
            <span className="text-mono-data text-on-surface-variant">
              Open: {globalMarket.length}
            </span>
          </header>
          <div className="flex flex-col gap-gutter">
            {globalMarket.map((job) => (
              <JobCard key={job.id} job={job} showClaim={showClaim} />
            ))}
            {globalMarket.length === 0 && (
              <p className="text-on-surface-variant">No global jobs posted.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
