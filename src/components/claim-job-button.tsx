"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";

export function ClaimJobButton({ jobId }: { jobId: string }) {
  return (
    <Link
      href={`/talent/workspace/${jobId}`}
      className="w-full bg-primary-container text-on-primary-fixed py-2 rounded text-label-caps flex items-center justify-center gap-2 hover:brightness-110 amber-glow transition-all"
    >
      <Icon name="bolt" filled className="text-[18px]" />
      Instant Claim (Preview)
    </Link>
  );
}
