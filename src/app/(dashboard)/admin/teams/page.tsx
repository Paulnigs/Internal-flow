import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { CreateTeamForm, CreateUserForm } from "@/components/team-forms";

export default async function AdminTeamsPage() {
  await requireRole(["ADMIN"]);

  const [teams, users] = await Promise.all([
    prisma.team.findMany({
      include: { lead: true, members: true, _count: { select: { jobs: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.user.findMany({
      include: { team: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="p-lg max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-lg">
      <div className="xl:col-span-2">
        <h1 className="text-display-lg text-on-surface mb-lg">Team Management</h1>
        <div className="grid gap-gutter">
          {teams.map((team) => (
            <div key={team.id} className="glass-panel rounded-lg p-md">
              <div className="flex justify-between items-start mb-sm">
                <div>
                  <h2 className="text-headline-md text-primary">{team.name}</h2>
                  <p className="text-body-sm text-on-surface-variant">
                    Lead: {team.lead?.name ?? "Unassigned"} · {team.members.length} members ·{" "}
                    {team._count.jobs} jobs
                  </p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-sm mt-md">
                {team.members.map((m) => (
                  <li
                    key={m.id}
                    className="px-2 py-1 bg-surface-container-high rounded text-body-sm text-on-surface"
                  >
                    {m.name} <span className="text-on-surface-variant">({m.role})</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <aside className="flex flex-col gap-lg">
        <div>
          <h2 className="text-headline-md mb-md">Add Team</h2>
          <CreateTeamForm users={users.filter((u) => u.role === "TEAM_LEAD" || u.role === "TALENT")} />
        </div>
        <div>
          <h2 className="text-headline-md mb-md">Add User</h2>
          <CreateUserForm teams={teams} />
        </div>
      </aside>
    </div>
  );
}
