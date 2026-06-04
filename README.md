# STUDIO_PRO

Internal talent job distribution and production management — Phase 1.

## Requirements

- Node.js 20+
- PostgreSQL 16+ (local via Docker, or hosted: Neon, Supabase, Railway, etc.)

## Local development

```bash
cd studio-pro
cp .env.example .env
npm install
npm run db:up          # starts Postgres on localhost:5432
npm run db:setup       # migrate + seed demo data
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

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build (no DB migrate) |
| `npm run build:deploy` | Build + apply migrations (CI/Vercel) |
| `npm start` | Run production server |
| `npm run db:up` | Start local Postgres (Docker) |
| `npm run db:setup` | Migrate + seed |

## Production build

```bash
npm run build
```

Requires `.env` with valid `DATABASE_URL`, `NEXTAUTH_URL`, and `NEXTAUTH_SECRET` for runtime; build itself only needs Prisma generate.

## Deploy

### Vercel (recommended)

1. Push repo and import project (root: `studio-pro`).
2. Add environment variables:
   - `DATABASE_URL` — PostgreSQL connection string (e.g. [Neon](https://neon.tech))
   - `NEXTAUTH_URL` — `https://your-domain.vercel.app`
   - `NEXTAUTH_SECRET` — `openssl rand -base64 32`
3. Deploy. `vercel.json` runs `prisma migrate deploy` on build.
4. After first deploy, seed once from your machine:
   ```bash
   DATABASE_URL="your-prod-url" npm run db:seed
   ```

### Docker

```bash
docker compose up -d db
# Set DATABASE_URL=postgresql://studio:studio@host.docker.internal:5432/studio_pro?schema=public
docker build -t studio-pro .
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://studio:studio@host.docker.internal:5432/studio_pro?schema=public" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e NEXTAUTH_SECRET="your-secret-min-16-chars" \
  studio-pro
```

### Railway / Render / Fly

- Use **PostgreSQL** add-on.
- Set the three env vars above.
- Build command: `npm run build:deploy`
- Start command: `npm start` (or Docker image).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_URL` | Yes | Public app URL (no trailing slash) |
| `NEXTAUTH_SECRET` | Yes | Session signing secret (min 16 chars) |

## Project structure

```
src/app/           # Routes (App Router)
src/components/    # UI
src/lib/           # Auth, Prisma, actions
prisma/            # Schema + migrations
```

Design reference mockups: `../stitch_talentflow_production_management_system/`
