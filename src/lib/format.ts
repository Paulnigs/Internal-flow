import { formatDistanceToNow, isPast } from "date-fns";

export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function formatDeadline(date: Date): { label: string; urgent: boolean } {
  const urgent = isPast(date);
  const label = urgent
    ? "Overdue"
    : formatDistanceToNow(date, { addSuffix: true });
  return { label, urgent };
}

export function statusLabel(status: string): string {
  return status.replace(/_/g, " ");
}
