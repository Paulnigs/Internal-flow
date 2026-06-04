"use client";

export function CreateTeamForm() {
  return (
    <form
      className="glass-panel rounded-lg p-md flex flex-col gap-sm"
      onSubmit={(e) => {
        e.preventDefault();
        alert("UI preview only — team was not created.");
      }}
    >
      <input
        name="name"
        placeholder="Team name"
        required
        className={inputCls}
      />
      <button type="submit" className="h-9 bg-primary-container text-on-primary-fixed text-label-caps">
        Create Team (Preview)
      </button>
    </form>
  );
}

export function CreateUserForm() {
  return (
    <form
      className="glass-panel rounded-lg p-md flex flex-col gap-sm"
      onSubmit={(e) => {
        e.preventDefault();
        alert("UI preview only — user was not created.");
      }}
    >
      <input name="name" placeholder="Full name" required className={inputCls} />
      <input name="email" type="email" placeholder="Email" required className={inputCls} />
      <button type="submit" className="h-9 bg-primary-container text-on-primary-fixed text-label-caps">
        Create User (Preview)
      </button>
    </form>
  );
}

const inputCls =
  "h-9 bg-surface-container-lowest border border-outline-variant/50 rounded px-3 text-body-sm";
