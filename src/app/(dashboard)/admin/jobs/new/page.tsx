import { requireRole } from "@/lib/session";
import { CreateJobForm } from "@/components/create-job-form";

export default async function NewJobPage() {
  await requireRole(["ADMIN"]);

  return (
    <div className="p-lg max-w-[720px] mx-auto">
      <h1 className="text-display-lg text-on-surface mb-lg">Create New Job</h1>
      <CreateJobForm />
    </div>
  );
}
