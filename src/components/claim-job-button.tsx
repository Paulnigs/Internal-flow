"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { claimJob } from "@/lib/actions/jobs";
import { Icon } from "@/components/icon";

export function ClaimJobButton({ jobId }: { jobId: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        start(async () => {
          const result = await claimJob(jobId);
          if (result.error) {
            alert(result.error);
            return;
          }
          router.push(`/talent/workspace/${jobId}`);
          router.refresh();
        })
      }
      className="w-full bg-primary-container text-on-primary-fixed py-2 rounded text-label-caps flex items-center justify-center gap-2 hover:brightness-110 amber-glow transition-all disabled:opacity-50"
    >
      <Icon name="bolt" filled className="text-[18px]" />
      {pending ? "Claiming…" : "Instant Claim"}
    </button>
  );
}
