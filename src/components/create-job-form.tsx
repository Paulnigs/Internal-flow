"use client";

export function CreateJobForm() {
  return (
    <form
      className="glass-panel rounded-lg p-lg flex flex-col gap-md"
      onSubmit={(e) => {
        e.preventDefault();
        alert("UI preview only — job was not created.");
      }}
    >
      <Field label="Title" name="title" required />
      <Field label="Description" name="description" required textarea />
      <Field label="Creative brief" name="brief" textarea />
      <div className="grid grid-cols-2 gap-md">
        <Field label="Reward (USD)" name="reward" type="number" placeholder="1250" required />
        <Field label="Deadline" name="deadline" type="datetime-local" required />
      </div>
      <button
        type="submit"
        className="h-10 bg-primary-container text-on-primary-fixed text-label-caps amber-glow"
      >
        Publish Job (Preview)
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  textarea,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
}) {
  const className =
    "bg-surface-container-lowest border border-outline-variant/50 rounded px-3 py-2 text-body-sm focus:border-primary-container focus:ring-0";
  return (
    <label className="flex flex-col gap-xs">
      <span className="text-label-caps text-on-surface-variant">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={className} />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={`h-9 ${className}`}
        />
      )}
    </label>
  );
}
