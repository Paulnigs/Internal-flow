import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import type { Role } from "@prisma/client";

export async function getSession() {
  return getServerSession(authOptions);
}

export async function requireSession() {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  return session;
}

export async function requireRole(allowed: Role[]) {
  const session = await requireSession();
  if (!allowed.includes(session.user.role)) {
    redirect(homeForRole(session.user.role));
  }
  return session;
}

export function homeForRole(role: Role): string {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "TEAM_LEAD":
      return "/lead/review";
    case "TALENT":
      return "/talent";
    default:
      return "/login";
  }
}
