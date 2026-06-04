import { redirect } from "next/navigation";
import { getSession, homeForRole } from "@/lib/session";

export default async function HomePage() {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  redirect(homeForRole(session.user.role));
}
