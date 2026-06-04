import Link from "next/link";
import { Icon } from "@/components/icon";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-lg relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-tertiary-container/5 rounded-full blur-[150px]" />
      </div>

      <main className="w-full max-w-[480px] z-10 flex flex-col gap-lg">
        <div className="flex flex-col gap-xs text-center">
          <span className="text-primary text-label-caps">SYSTEM ACCESS</span>
          <h1 className="text-display-lg text-on-surface">STUDIO_PRO</h1>
          <p className="text-body-sm text-on-surface-variant">
            Auth screen mock — preview mode skips login.
          </p>
        </div>

        <div className="glass-panel border border-outline-variant/30 p-lg rounded-xl flex flex-col gap-md">
          <label className="text-label-caps text-on-surface-variant">Operator ID</label>
          <input
            readOnly
            value="admin@studio.pro"
            className="w-full h-9 bg-surface-container-lowest border border-outline-variant/50 rounded px-3 text-body-sm opacity-70"
          />
          <label className="text-label-caps text-on-surface-variant">Secure Key</label>
          <input
            readOnly
            type="password"
            value="••••••••"
            className="w-full h-9 bg-surface-container-lowest border border-outline-variant/50 rounded px-3 text-body-sm opacity-70"
          />
          <Link
            href="/admin"
            className="w-full h-10 bg-primary-container text-on-primary-fixed text-label-caps amber-glow transition-all flex items-center justify-center gap-2"
          >
            Continue to Admin Dashboard
            <Icon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>

        <Link href="/" className="text-center text-label-caps text-primary hover:underline">
          ← Back to all screens
        </Link>
      </main>
    </div>
  );
}
