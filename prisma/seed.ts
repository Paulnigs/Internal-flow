import { PrismaClient, JobCategory, JobPriority, JobStatus, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.notification.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.job.deleteMany();
  await prisma.user.deleteMany();
  await prisma.team.deleteMany();

  const passwordHash = await bcrypt.hash("studio123", 10);

  const alpha = await prisma.team.create({
    data: { name: "Production Alpha" },
  });

  const admin = await prisma.user.create({
    data: {
      email: "admin@studio.pro",
      name: "Platform Admin",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  const lead = await prisma.user.create({
    data: {
      email: "lead@studio.pro",
      name: "Jordan Reyes",
      passwordHash,
      role: Role.TEAM_LEAD,
      teamId: alpha.id,
    },
  });

  await prisma.team.update({
    where: { id: alpha.id },
    data: { leadId: lead.id },
  });

  const talent1 = await prisma.user.create({
    data: {
      email: "editor@studio.pro",
      name: "Alex Chen",
      passwordHash,
      role: Role.TALENT,
      teamId: alpha.id,
    },
  });

  const talent2 = await prisma.user.create({
    data: {
      email: "editor2@studio.pro",
      name: "Sam Ortiz",
      passwordHash,
      role: Role.TALENT,
      teamId: alpha.id,
    },
  });

  const now = Date.now();
  const jobs = [
    {
      title: "Netflix Original: S3 Ep04 Assembly",
      description:
        "Initial assembly edit for the narrative thriller series. Follow storyboard XML v4.2.",
      brief: "Match reference cut in shared drive. Maintain 24fps timeline.",
      rewardCents: 125000,
      deadline: new Date(now + 14 * 60 * 60 * 1000),
      priority: JobPriority.HIGH,
      category: JobCategory.NARRATIVE,
      teamId: alpha.id,
    },
    {
      title: "Cyberpunk 2077 DLC - Social Cuts",
      description:
        "High-energy commercial short-form edits for TikTok and Instagram Reels. 9:16 aspect ratio.",
      rewardCents: 45000,
      deadline: new Date(now + 2 * 24 * 60 * 60 * 1000),
      priority: JobPriority.NORMAL,
      category: JobCategory.SHORT_FORM,
      teamId: alpha.id,
    },
    {
      title: "Global Brand Anthem - 60s Cut",
      description: "Cinematic brand film assembly with licensed music bed.",
      rewardCents: 89000,
      deadline: new Date(now + 5 * 24 * 60 * 60 * 1000),
      priority: JobPriority.NORMAL,
      category: JobCategory.COMMERCIAL,
      teamId: null,
    },
    {
      title: "Documentary B-Roll Sync Pass",
      description: "Sync and label interview B-roll for ep. 7.",
      rewardCents: 32000,
      deadline: new Date(now + 36 * 60 * 60 * 1000),
      priority: JobPriority.CRITICAL,
      category: JobCategory.OTHER,
      teamId: null,
    },
  ];

  for (const job of jobs) {
    await prisma.job.create({
      data: { ...job, status: JobStatus.OPEN },
    });
  }

  console.log("Seed complete.");
  console.log("Demo accounts (password: studio123):");
  console.log(`  Admin:  ${admin.email}`);
  console.log(`  Lead:   ${lead.email}`);
  console.log(`  Talent: ${talent1.email}, ${talent2.email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
