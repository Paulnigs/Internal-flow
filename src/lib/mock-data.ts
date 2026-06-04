import type {
  JobCategory,
  JobPriority,
  JobStatus,
  Role,
  SubmissionStatus,
} from "@/lib/types";

export type DemoUser = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  teamId: string | null;
};

/** Frontend preview — hardcoded logins (password: studio123) */
export const DEMO_USERS: DemoUser[] = [
  {
    id: "user-admin",
    email: "admin@studio.pro",
    password: "studio123",
    name: "Platform Admin",
    role: "ADMIN",
    teamId: null,
  },
  {
    id: "user-lead",
    email: "lead@studio.pro",
    password: "studio123",
    name: "Jordan Reyes",
    role: "TEAM_LEAD",
    teamId: "team-alpha",
  },
  {
    id: "user-talent-1",
    email: "editor@studio.pro",
    password: "studio123",
    name: "Alex Chen",
    role: "TALENT",
    teamId: "team-alpha",
  },
  {
    id: "user-talent-2",
    email: "editor2@studio.pro",
    password: "studio123",
    name: "Sam Ortiz",
    role: "TALENT",
    teamId: "team-alpha",
  },
];

export type MockJob = {
  id: string;
  title: string;
  description: string;
  brief?: string;
  rewardCents: number;
  deadline: Date;
  priority: JobPriority;
  category: JobCategory;
  status: JobStatus;
  teamId: string | null;
  team?: { name: string } | null;
  claimedById?: string | null;
  claimedBy?: { name: string } | null;
};

const now = Date.now();

export const MOCK_JOBS: MockJob[] = [
  {
    id: "job-1",
    title: "Netflix Original: S3 Ep04 Assembly",
    description:
      "Initial assembly edit for the narrative thriller series. Follow storyboard XML v4.2.",
    brief: "Match reference cut in shared drive. Maintain 24fps timeline.",
    rewardCents: 125000,
    deadline: new Date(now + 14 * 60 * 60 * 1000),
    priority: "HIGH",
    category: "NARRATIVE",
    status: "OPEN",
    teamId: "team-alpha",
    team: { name: "Production Alpha" },
  },
  {
    id: "job-2",
    title: "Cyberpunk 2077 DLC - Social Cuts",
    description:
      "High-energy commercial short-form edits for TikTok and Instagram Reels. 9:16 aspect ratio.",
    rewardCents: 45000,
    deadline: new Date(now + 2 * 24 * 60 * 60 * 1000),
    priority: "NORMAL",
    category: "SHORT_FORM",
    status: "OPEN",
    teamId: "team-alpha",
    team: { name: "Production Alpha" },
  },
  {
    id: "job-3",
    title: "Global Brand Anthem - 60s Cut",
    description: "Cinematic brand film assembly with licensed music bed.",
    rewardCents: 89000,
    deadline: new Date(now + 5 * 24 * 60 * 60 * 1000),
    priority: "NORMAL",
    category: "COMMERCIAL",
    status: "OPEN",
    teamId: null,
    team: null,
  },
  {
    id: "job-4",
    title: "Documentary B-Roll Sync Pass",
    description: "Sync and label interview B-roll for ep. 7.",
    rewardCents: 32000,
    deadline: new Date(now + 36 * 60 * 60 * 1000),
    priority: "CRITICAL",
    category: "OTHER",
    status: "OPEN",
    teamId: null,
    team: null,
  },
  {
    id: "job-5",
    title: "Cyberpunk Cinematic Trailer - Scene 04",
    description: "High-octane 30-second sequence with neon lighting and rain reflections.",
    brief:
      "Create a high-octane 30-second sequence. Output: ProRes 422 HQ, 3840x2160, 23.976fps.",
    rewardCents: 95000,
    deadline: new Date(now + 4 * 60 * 60 * 1000),
    priority: "HIGH",
    category: "NARRATIVE",
    status: "CLAIMED",
    teamId: "team-alpha",
    team: { name: "Production Alpha" },
    claimedById: "user-talent-1",
    claimedBy: { name: "Alex Chen" },
  },
];

export const MOCK_TEAMS = [
  {
    id: "team-alpha",
    name: "Production Alpha",
    lead: { name: "Jordan Reyes" },
    members: DEMO_USERS.filter((u) => u.teamId === "team-alpha"),
    jobCount: 3,
  },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: "n1",
    title: "Job claimed",
    message: 'Alex Chen claimed "Cyberpunk Cinematic Trailer - Scene 04".',
    read: false,
    createdAt: new Date(now - 30 * 60 * 1000),
  },
  {
    id: "n2",
    title: "New team mission",
    message: '"Netflix Original: S3 Ep04 Assembly" is available on your team board.',
    read: true,
    createdAt: new Date(now - 2 * 60 * 60 * 1000),
  },
];

export type MockSubmission = {
  id: string;
  jobId: string;
  deliverableUrl?: string | null;
  notes?: string | null;
  submittedAt: Date;
  status: SubmissionStatus;
  feedback?: string | null;
  job: MockJob & { claimedBy?: { name: string } | null; team?: { name: string; leadId?: string } | null };
};

export const MOCK_SUBMISSIONS: MockSubmission[] = [
  {
    id: "sub-1",
    jobId: "job-pending",
    deliverableUrl: "https://drive.google.com/example",
    notes: "v04 with RSMB pass on impacts.",
    submittedAt: new Date(now - 2 * 60 * 60 * 1000),
    status: "PENDING",
    job: {
      id: "job-pending",
      title: "Product Launch Sizzle Reel",
      description: "60s high-energy cut for Q3 launch.",
      rewardCents: 72000,
      deadline: new Date(now + 24 * 60 * 60 * 1000),
      priority: "HIGH",
      category: "COMMERCIAL",
      status: "SUBMITTED",
      teamId: "team-alpha",
      team: { name: "Production Alpha", leadId: "user-lead" },
      claimedBy: { name: "Alex Chen" },
    },
  },
];

export function findDemoUser(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  return DEMO_USERS.find(
    (u) => u.email === normalized && u.password === password,
  );
}

export function getJobById(id: string) {
  return MOCK_JOBS.find((j) => j.id === id) ?? MOCK_JOBS[4];
}

export function getSubmissionById(id: string) {
  return MOCK_SUBMISSIONS.find((s) => s.id === id) ?? MOCK_SUBMISSIONS[0];
}
