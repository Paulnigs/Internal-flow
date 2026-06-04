import { Icon } from "@/components/icon";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-lg relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-tertiary-container/5 rounded-full blur-[150px]" />
      </div>

      <main className="w-full max-w-[1000px] z-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <section className="lg:col-span-5 flex flex-col gap-lg">
          <div className="flex flex-col gap-xs">
            <span className="text-primary text-label-caps">SYSTEM ACCESS</span>
            <h1 className="text-display-lg text-on-surface">STUDIO_PRO</h1>
            <p className="text-body-sm text-on-surface-variant max-w-[320px]">
              Unified control interface for professional production environments.
            </p>
          </div>
          <LoginForm />
        </section>

        <section className="lg:col-span-7 glass-panel rounded-xl p-lg border border-outline-variant/20 hidden lg:flex flex-col gap-md">
          <span className="text-label-caps text-tertiary">PHASE 1 ONLINE</span>
          <h2 className="text-headline-md text-on-surface">Production Control Modules</h2>
          <ul className="grid grid-cols-2 gap-sm text-body-sm text-on-surface-variant">
            {[
              "Role-based authentication",
              "Instant job claiming",
              "One active job per talent",
              "Team-scoped missions",
              "Submission & review flow",
              "In-app notifications",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Icon name="check_circle" className="text-success text-[16px]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
