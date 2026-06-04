"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { Role } from "@prisma/client";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(Role),
  teamId: z.string().optional(),
});

export async function createUser(formData: FormData) {
  await requireRole(["ADMIN"]);
  const parsed = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    teamId: formData.get("teamId") || undefined,
  });
  if (!parsed.success) return { error: "Invalid user data" };

  const exists = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });
  if (exists) return { error: "Email already registered" };

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      passwordHash: await bcrypt.hash(parsed.data.password, 10),
      role: parsed.data.role,
      teamId: parsed.data.teamId || null,
    },
  });

  revalidatePath("/admin/teams");
  return { success: true };
}

export async function createTeam(formData: FormData) {
  await requireRole(["ADMIN"]);
  const name = String(formData.get("name") || "").trim();
  const leadId = String(formData.get("leadId") || "") || null;
  if (!name) return { error: "Team name required" };

  await prisma.team.create({
    data: { name, leadId },
  });

  if (leadId) {
    await prisma.user.update({
      where: { id: leadId },
      data: { role: Role.TEAM_LEAD },
    });
  }

  revalidatePath("/admin/teams");
  return { success: true };
}

export async function assignUserToTeam(userId: string, teamId: string | null) {
  await requireRole(["ADMIN"]);
  await prisma.user.update({
    where: { id: userId },
    data: { teamId },
  });
  revalidatePath("/admin/teams");
  return { success: true };
}

export async function markNotificationRead(id: string) {
  const session = await requireRole(["ADMIN", "TEAM_LEAD", "TALENT"]);
  await prisma.notification.updateMany({
    where: { id, userId: session.user.id },
    data: { read: true },
  });
  revalidatePath("/");
  return { success: true };
}

export async function markAllNotificationsRead() {
  const session = await requireRole(["ADMIN", "TEAM_LEAD", "TALENT"]);
  await prisma.notification.updateMany({
    where: { userId: session.user.id, read: false },
    data: { read: true },
  });
  revalidatePath("/");
  return { success: true };
}
