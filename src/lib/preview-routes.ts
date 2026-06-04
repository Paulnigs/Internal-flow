export type PreviewRoute = {
  href: string;
  label: string;
  icon: string;
  group: "Auth" | "Admin" | "Talent" | "Lead" | "Shared";
};

export const PREVIEW_ROUTES: PreviewRoute[] = [
  { href: "/login", label: "Secure Entry", icon: "login", group: "Auth" },
  { href: "/admin", label: "Admin Dashboard", icon: "dashboard", group: "Admin" },
  { href: "/admin/jobs", label: "Job Management", icon: "dataset", group: "Admin" },
  { href: "/admin/jobs/new", label: "Create Job", icon: "add_circle", group: "Admin" },
  { href: "/admin/teams", label: "Team Management", icon: "group", group: "Admin" },
  { href: "/talent", label: "Editor Dashboard", icon: "dashboard", group: "Talent" },
  { href: "/talent/board", label: "Job Board", icon: "dataset", group: "Talent" },
  { href: "/talent/workspace/job-5", label: "Active Workspace", icon: "movie_edit", group: "Talent" },
  { href: "/talent/history", label: "Submission History", icon: "history", group: "Talent" },
  { href: "/lead/review", label: "Review Queue", icon: "rate_review", group: "Lead" },
  { href: "/lead/review/sub-1", label: "Review Detail", icon: "fact_check", group: "Lead" },
  { href: "/comms", label: "Team Comms", icon: "forum", group: "Shared" },
];

export const SIDEBAR_ROUTES = PREVIEW_ROUTES.filter((r) => r.href !== "/login");
