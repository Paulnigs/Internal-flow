const styles: Record<string, string> = {
  OPEN: "bg-tertiary/20 text-tertiary border-tertiary/40",
  CLAIMED: "bg-primary-container/20 text-primary-container border-primary-container/40",
  SUBMITTED: "bg-tertiary-container/20 text-tertiary border-tertiary-container/40",
  APPROVED: "bg-success/20 text-success border-success/40",
  REJECTED: "bg-error/20 text-error border-error/40",
  PENDING: "bg-primary/20 text-primary border-primary/40",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = styles[status] ?? "bg-surface-variant text-on-surface-variant";
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded text-label-caps border ${cls}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
