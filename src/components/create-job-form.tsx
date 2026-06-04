"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/actions/jobs";
import { JobCategory, JobPriority } from "@prisma/client";

export function CreateJobForm({
  teams,
}: {
  teams: { id: string; name: string }[];
}) {
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <form
      className="glass-panel rounded-lg p-lg flex flex-col gap-md"
      action={(fd) =>
        start(async () => {
          const result = await createJob(fd);
          if (result.error) {
            alert(result.error);
            return;
          }
          router.push("/admin/jobs");
          router.refresh();
        })
      }
    >
      <Field label="Title" name="title" required />
      <Field label="Description" name="description" required textarea />
      <Field label="Creative brief" name="brief" textarea />
      <div className="grid grid-cols-2 gap-md">
        <Field label="Reward (USD)" name="reward" type="number" placeholder="1250" required />
        <Field label="Deadline" name="deadline" type="datetime-local" required />
      </div>
      <div className="grid grid-cols-2 gap-md">
        <label className="flex flex-col gap-xs">
          <span className="text-label-caps text-on-surface-variant">Priority</span>
          <select
            name="priority"
            className="h-9 bg-surface-container-lowest border border-outline-variant/50 rounded px-2 text-body-sm"
            defaultValue={JobPriority.NORMAL}
          >
            {Object.values(JobPriority).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-xs">
          <span className="text-label-caps text-on-surface-variant">Category</span>
          <select
            name="category"
            className="h-9 bg-surface-container-lowest border border-outline-variant/50 rounded px-2 text-body-sm"
            defaultValue={JobCategory.OTHER}
          >
            {Object.values(JobCategory).map((c) => (
              <option key={c} value={c}>
                {c.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-xs">
        <span className="text-label-caps text-on-surface-variant">Assign to team (optional)</span>
        <select
          name="teamId"
          className="h-9 bg-surface-container-lowest border border-outline-variant/50 rounded px-2 text-body-sm"
          defaultValue=""
        >
          <option value="">Open market (all talents)</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="h-10 bg-primary-container text-on-primary-fixed text-label-caps amber-glow disabled:opacity-50"
      >
        {pending ? "Publishing…" : "Publish Job"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  textarea,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
}) {
  const className =
    "bg-surface-container-lowest border border-outline-variant/50 rounded px-3 py-2 text-body-sm focus:border-primary-container focus:ring-0";
  return (
    <label className="flex flex-col gap-xs">
      <span className="text-label-caps text-on-surface-variant">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={className} />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={`h-9 ${className}`}
        />
      )}
    </label>
  );
}
