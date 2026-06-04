"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTeam, createUser } from "@/lib/actions/teams";
import { Role } from "@prisma/client";

const inputCls =
  "h-9 bg-surface-container-lowest border border-outline-variant/50 rounded px-3 text-body-sm";

export function CreateTeamForm({
  users,
}: {
  users: { id: string; name: string; email: string }[];
}) {
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <form
      className="glass-panel rounded-lg p-md flex flex-col gap-sm"
      action={(fd) =>
        start(async () => {
          const r = await createTeam(fd);
          if (r.error) alert(r.error);
          router.refresh();
        })
      }
    >
      <input
        name="name"
        placeholder="Team name"
        required
        className="h-9 bg-surface-container-lowest border border-outline-variant/50 rounded px-3 text-body-sm"
      />
      <select
        name="leadId"
        className="h-9 bg-surface-container-lowest border border-outline-variant/50 rounded px-2 text-body-sm"
        defaultValue=""
      >
        <option value="">No lead yet</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="h-9 bg-primary-container text-on-primary-fixed text-label-caps"
      >
        Create Team
      </button>
    </form>
  );
}

export function CreateUserForm({ teams }: { teams: { id: string; name: string }[] }) {
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <form
      className="glass-panel rounded-lg p-md flex flex-col gap-sm"
      action={(fd) =>
        start(async () => {
          const r = await createUser(fd);
          if (r.error) alert(r.error);
          router.refresh();
        })
      }
    >
      <input name="name" placeholder="Full name" required className={inputCls} />
      <input name="email" type="email" placeholder="Email" required className={inputCls} />
      <input name="password" type="password" placeholder="Password" required className={inputCls} />
      <select name="role" className={inputCls} defaultValue={Role.TALENT}>
        {Object.values(Role).map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <select name="teamId" className={inputCls} defaultValue="">
        <option value="">No team</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="h-9 bg-primary-container text-on-primary-fixed text-label-caps"
      >
        Create User
      </button>
    </form>
  );
}
