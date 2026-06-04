"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitJob } from "@/lib/actions/jobs";

export function SubmitJobForm({ jobId }: { jobId: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <form
      className="glass-panel rounded-lg p-md flex flex-col gap-sm border border-primary-container/30"
      action={(fd) =>
        start(async () => {
          fd.set("jobId", jobId);
          const r = await submitJob(fd);
          if (r.error) alert(r.error);
          else {
            router.refresh();
            alert("Submitted for review!");
          }
        })
      }
    >
      <h2 className="text-label-caps text-primary-container">Submit Final Cut</h2>
      <input type="hidden" name="jobId" value={jobId} />
      <label className="text-label-caps text-on-surface-variant">Deliverable URL</label>
      <input
        name="deliverableUrl"
        type="url"
        placeholder="https://drive.google.com/..."
        className="h-9 bg-surface-container-lowest border border-outline-variant/50 rounded px-3 text-body-sm"
      />
      <label className="text-label-caps text-on-surface-variant">Notes</label>
      <textarea
        name="notes"
        rows={3}
        className="bg-surface-container-lowest border border-outline-variant/50 rounded px-3 py-2 text-body-sm"
        placeholder="Version, codec, special instructions…"
      />
      <button
        type="submit"
        disabled={pending}
        className="h-10 bg-primary-container text-on-primary-fixed text-label-caps amber-glow disabled:opacity-50"
      >
        {pending ? "Submitting…" : "Submit for Review"}
      </button>
    </form>
  );
}
