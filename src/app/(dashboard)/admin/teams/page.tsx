import { requireRole } from "@/lib/session";
import { MOCK_TEAMS } from "@/lib/mock-data";
import { CreateTeamForm, CreateUserForm } from "@/components/team-forms";

export default async function AdminTeamsPage() {
  await requireRole(["ADMIN"]);

  return (
    <div className="p-lg max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-lg">
      <div className="xl:col-span-2">
        <h1 className="text-display-lg text-on-surface mb-lg">Team Management</h1>
        <div className="grid gap-gutter">
          {MOCK_TEAMS.map((team) => (
            <div key={team.id} className="glass-panel rounded-lg p-md">
              <h2 className="text-headline-md text-primary">{team.name}</h2>
              <p className="text-body-sm text-on-surface-variant">
                Lead: {team.lead.name} · {team.members.length} members · {team.jobCount} jobs
              </p>
              <ul className="flex flex-wrap gap-sm mt-md">
                {team.members.map((m) => (
                  <li
                    key={m.id}
                    className="px-2 py-1 bg-surface-container-high rounded text-body-sm text-on-surface"
                  >
                    {m.name} ({m.role})
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
          <CreateTeamForm />
        </div>
        <div>
          <h2 className="text-headline-md mb-md">Add User</h2>
          <CreateUserForm />
        </div>
      </aside>
    </div>
  );
}
