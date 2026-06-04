"use client";

export function SubmitJobForm({ jobId }: { jobId: string }) {
  return (
    <form
      className="glass-panel rounded-lg p-md flex flex-col gap-sm border border-primary-container/30"
      onSubmit={(e) => {
        e.preventDefault();
        alert("UI preview only — submission is not saved.");
      }}
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
        className="h-10 bg-primary-container text-on-primary-fixed text-label-caps amber-glow"
      >
        Submit for Review (Preview)
      </button>
    </form>
  );
}
