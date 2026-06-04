# STUDIO_PRO

Internal talent job distribution and production management — Phase 1 implementation from the Stitch design export.

## Features (Phase 1)

- Role-based auth (Admin, Team Lead, Talent)
- User & team management
- Job creation and listing (admin)
- Real-time job board with instant claim (first-come-first-served)
- One active job per talent
- Talent workspace and submission flow
- Team lead / admin review queue
- In-app notifications

## Stack

- **Next.js 16** (App Router)
- **Prisma** + SQLite (local dev; switch `DATABASE_URL` to PostgreSQL for production)
- **NextAuth.js** (credentials)
- **Tailwind CSS v4** (Studio Production design tokens)

## Quick start

```bash
cd studio-pro
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo accounts (password: `studio123`)

| Role       | Email              |
|------------|--------------------|
| Admin      | admin@studio.pro   |
| Team Lead  | lead@studio.pro    |
| Talent     | editor@studio.pro  |

## Scripts

| Command        | Description                |
|----------------|----------------------------|
| `npm run dev`  | Start dev server           |
| `npm run build`| Production build           |
| `npm run db:seed` | Reset seed data         |
| `npx prisma studio` | Database GUI          |

## Project structure

```
src/
  app/
    login/              # Auth gateway
    (dashboard)/        # Authenticated shell
      admin/            # Admin dashboard, jobs, teams
      talent/           # Board, workspace, history
      lead/review/      # Review queue
  components/           # UI + forms
  lib/
    actions/            # Server actions (jobs, teams)
    auth.ts             # NextAuth config
    prisma.ts           # DB client
```

## Phase 2 (not implemented)

- Socket.io real-time sync
- S3 / Cloudinary uploads
- NestJS API split
- PostgreSQL in production

Design reference mockups remain in `../stitch_talentflow_production_management_system/`.
