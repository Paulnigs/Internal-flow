"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession, requireRole } from "@/lib/session";
import { JobCategory, JobPriority, JobStatus, SubmissionStatus } from "@prisma/client";
import { z } from "zod";

const createJobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  brief: z.string().optional(),
  reward: z.coerce.number().min(1),
  deadline: z.string(),
  priority: z.nativeEnum(JobPriority),
  category: z.nativeEnum(JobCategory),
  teamId: z.string().optional(),
});

export async function createJob(formData: FormData) {
  await requireRole(["ADMIN"]);
  const parsed = createJobSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    brief: formData.get("brief") || undefined,
    reward: formData.get("reward"),
    deadline: formData.get("deadline"),
    priority: formData.get("priority") || JobPriority.NORMAL,
    category: formData.get("category") || JobCategory.OTHER,
    teamId: formData.get("teamId") || undefined,
  });
  if (!parsed.success) return { error: "Invalid job data" };

  const { reward, ...rest } = parsed.data;
  const job = await prisma.job.create({
    data: {
      ...rest,
      rewardCents: Math.round(reward * 100),
      deadline: new Date(parsed.data.deadline),
      teamId: parsed.data.teamId || null,
      status: JobStatus.OPEN,
    },
  });

  if (parsed.data.teamId) {
    const members = await prisma.user.findMany({
      where: { teamId: parsed.data.teamId, role: "TALENT" },
    });
    await prisma.notification.createMany({
      data: members.map((m) => ({
        userId: m.id,
        title: "New team mission",
        message: `"${job.title}" is available on your team board.`,
      })),
    });
  }

  revalidatePath("/admin/jobs");
  revalidatePath("/talent/board");
  return { success: true, jobId: job.id };
}

export async function claimJob(jobId: string) {
  const session = await requireRole(["TALENT"]);
  const userId = session.user.id;

  const active = await prisma.job.findFirst({
    where: {
      claimedById: userId,
      status: { in: [JobStatus.CLAIMED, JobStatus.SUBMITTED] },
    },
  });
  if (active) {
    return { error: "You already have an active job. Complete it before claiming another." };
  }

  const result = await prisma.$transaction(async (tx) => {
    const job = await tx.job.findUnique({ where: { id: jobId } });
    if (!job || job.status !== JobStatus.OPEN) {
      return { error: "This job is no longer available." };
    }
    if (job.teamId && job.teamId !== session.user.teamId) {
      return { error: "This job is restricted to another team." };
    }

    const updated = await tx.job.updateMany({
      where: { id: jobId, status: JobStatus.OPEN, claimedById: null },
      data: {
        status: JobStatus.CLAIMED,
        claimedById: userId,
        claimedAt: new Date(),
      },
    });
    if (updated.count === 0) {
      return { error: "Someone else claimed this job first." };
    }

    const admins = await tx.user.findMany({ where: { role: "ADMIN" } });
    await tx.notification.createMany({
      data: admins.map((a) => ({
        userId: a.id,
        title: "Job claimed",
        message: `${session.user.name} claimed "${job.title}".`,
      })),
    });

    if (job.teamId) {
      const lead = await tx.team.findUnique({
        where: { id: job.teamId },
        select: { leadId: true },
      });
      if (lead?.leadId) {
        await tx.notification.create({
          data: {
            userId: lead.leadId,
            title: "Job claimed",
            message: `${session.user.name} started work on "${job.title}".`,
          },
        });
      }
    }

    return { success: true };
  });

  revalidatePath("/talent/board");
  revalidatePath("/talent");
  revalidatePath("/admin/jobs");
  return result;
}

const submitSchema = z.object({
  jobId: z.string(),
  deliverableUrl: z.string().url().optional().or(z.literal("")),
  notes: z.string().optional(),
});

export async function submitJob(formData: FormData) {
  const session = await requireRole(["TALENT"]);
  const parsed = submitSchema.safeParse({
    jobId: formData.get("jobId"),
    deliverableUrl: formData.get("deliverableUrl") || "",
    notes: formData.get("notes") || undefined,
  });
  if (!parsed.success) return { error: "Invalid submission" };

  const job = await prisma.job.findUnique({
    where: { id: parsed.data.jobId },
    include: { team: true },
  });
  const submittable: JobStatus[] = [JobStatus.CLAIMED, JobStatus.REJECTED];
  if (!job || job.claimedById !== session.user.id || !submittable.includes(job.status)) {
    return { error: "You cannot submit this job." };
  }

  await prisma.$transaction([
    prisma.submission.upsert({
      where: { jobId: job.id },
      create: {
        jobId: job.id,
        deliverableUrl: parsed.data.deliverableUrl || null,
        notes: parsed.data.notes,
        status: SubmissionStatus.PENDING,
      },
      update: {
        deliverableUrl: parsed.data.deliverableUrl || null,
        notes: parsed.data.notes,
        status: SubmissionStatus.PENDING,
        submittedAt: new Date(),
      },
    }),
    prisma.job.update({
      where: { id: job.id },
      data: { status: JobStatus.SUBMITTED },
    }),
  ]);

  const leadId = job.team?.leadId;
  const notifyIds = [
    ...(leadId ? [leadId] : []),
    ...(await prisma.user.findMany({ where: { role: "ADMIN" }, select: { id: true } })).map(
      (u) => u.id,
    ),
  ];
  const uniqueIds = [...new Set(notifyIds)];
  await prisma.notification.createMany({
    data: uniqueIds.map((userId) => ({
      userId,
      title: "Submission received",
      message: `${session.user.name} submitted "${job.title}" for review.`,
    })),
  });

  revalidatePath(`/talent/workspace/${job.id}`);
  revalidatePath("/lead/review");
  revalidatePath("/talent/history");
  return { success: true };
}

export async function reviewSubmission(
  submissionId: string,
  decision: "APPROVED" | "REJECTED",
  feedback: string,
) {
  const session = await requireRole(["ADMIN", "TEAM_LEAD"]);

  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: { job: { include: { claimedBy: true, team: true } } },
  });
  if (!submission) return { error: "Submission not found" };
  if (submission.status !== SubmissionStatus.PENDING) {
    return { error: "Already reviewed" };
  }

  if (
    session.user.role === "TEAM_LEAD" &&
    submission.job.team?.leadId !== session.user.id
  ) {
    return { error: "Not authorized to review this submission" };
  }

  const approved = decision === "APPROVED";
  await prisma.$transaction([
    prisma.submission.update({
      where: { id: submissionId },
      data: {
        status: approved ? SubmissionStatus.APPROVED : SubmissionStatus.REJECTED,
        feedback,
        reviewedAt: new Date(),
        reviewedById: session.user.id,
      },
    }),
    prisma.job.update({
      where: { id: submission.jobId },
      data: { status: approved ? JobStatus.APPROVED : JobStatus.REJECTED },
    }),
  ]);

  if (submission.job.claimedById) {
    await prisma.notification.create({
      data: {
        userId: submission.job.claimedById,
        title: approved ? "Work approved" : "Revision requested",
        message: `"${submission.job.title}" was ${approved ? "approved" : "rejected"}. ${feedback}`,
      },
    });
  }

  revalidatePath("/lead/review");
  revalidatePath("/talent/history");
  revalidatePath("/talent/board");
  return { success: true };
}
