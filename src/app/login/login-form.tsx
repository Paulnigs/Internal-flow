"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Icon } from "@/components/icon";

const demos = [
  { label: "Admin", email: "admin@studio.pro" },
  { label: "Team Lead", email: "lead@studio.pro" },
  { label: "Talent", email: "editor@studio.pro" },
];

function LoginFormInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid operator ID or secure key.");
      return;
    }
    router.push(params.get("callbackUrl") || "/");
    router.refresh();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="glass-panel border border-outline-variant/30 p-lg rounded-xl flex flex-col gap-md"
      >
        <div className="flex flex-col gap-xs">
          <label className="text-label-caps text-on-surface-variant">Operator ID</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@studio.pro"
            required
            className="w-full h-9 bg-surface-container-lowest border border-outline-variant/50 focus:border-primary-container focus:ring-0 text-body-sm px-3 rounded"
          />
        </div>
        <div className="flex flex-col gap-xs">
          <label className="text-label-caps text-on-surface-variant">Secure Key</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-9 bg-surface-container-lowest border border-outline-variant/50 focus:border-primary-container focus:ring-0 text-body-sm px-3 rounded"
          />
        </div>
        {error && <p className="text-error text-body-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 bg-primary-container text-on-primary-fixed text-label-caps amber-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Initialising…" : "Initialize Session"}
          <Icon name="bolt" className="text-[16px]" />
        </button>
      </form>

      <div className="flex flex-wrap gap-sm">
        {demos.map((d) => (
          <button
            key={d.email}
            type="button"
            onClick={() => {
              setEmail(d.email);
              setPassword("studio123");
            }}
            className="px-3 py-1.5 text-label-caps border border-outline-variant/40 rounded hover:border-primary-container/50 transition-colors"
          >
            {d.label}
          </button>
        ))}
      </div>
      <p className="text-body-sm text-on-surface-variant/70">
        Demo password for all accounts: <code className="text-primary">studio123</code>
      </p>
    </>
  );
}

export function LoginForm() {
  return (
    <Suspense fallback={<p className="text-on-surface-variant">Loading…</p>}>
      <LoginFormInner />
    </Suspense>
  );
}
