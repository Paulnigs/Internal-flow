"use client";

import { useRouter } from "next/navigation";

export function ReviewForm({ submissionId }: { submissionId: string }) {
  const router = useRouter();

  function handle(decision: "APPROVED" | "REJECTED") {
    const fb = (document.getElementById("feedback") as HTMLTextAreaElement)?.value;
    if (decision === "REJECTED" && !fb?.trim()) {
      alert("Please provide feedback for rejection.");
      return;
    }
    alert(`UI preview only — ${decision} for ${submissionId} (not saved).`);
    router.push("/lead/review");
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
          onClick={() => handle("APPROVED")}
          className="flex-1 h-10 bg-success/20 text-success border border-success/40 text-label-caps rounded hover:bg-success/30"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={() => handle("REJECTED")}
          className="flex-1 h-10 bg-error/20 text-error border border-error/40 text-label-caps rounded hover:bg-error/30"
        >
          Request Revision
        </button>
      </div>
    </div>
  );
}
