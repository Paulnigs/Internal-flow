"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { reviewSubmission } from "@/lib/actions/jobs";

export function ReviewForm({ submissionId }: { submissionId: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();

  function handle(decision: "APPROVED" | "REJECTED", feedback: string) {
    start(async () => {
      const r = await reviewSubmission(submissionId, decision, feedback);
      if (r.error) alert(r.error);
      else {
        router.push("/lead/review");
        router.refresh();
      }
    });
  }

  return (
    <div className="glass-panel rounded-lg p-lg flex flex-col gap-md">
      <h2 className="text-label-caps">Directive / Feedback</h2>
      <textarea
        id="feedback"
        rows={4}
        className="bg-surface-container-lowest border border-outline-variant/50 rounded px-3 py-2 text-body-sm"
        placeholder="Approval notes or revision instructions…"
      />
      <div className="flex gap-sm">
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            const fb = (document.getElementById("feedback") as HTMLTextAreaElement).value;
            handle("APPROVED", fb || "Approved — great work.");
          }}
          className="flex-1 h-10 bg-success/20 text-success border border-success/40 text-label-caps rounded hover:bg-success/30 disabled:opacity-50"
        >
          Approve
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            const fb = (document.getElementById("feedback") as HTMLTextAreaElement).value;
            if (!fb.trim()) {
              alert("Please provide feedback for rejection.");
              return;
            }
            handle("REJECTED", fb);
          }}
          className="flex-1 h-10 bg-error/20 text-error border border-error/40 text-label-caps rounded hover:bg-error/30 disabled:opacity-50"
        >
          Request Revision
        </button>
      </div>
    </div>
  );
}
