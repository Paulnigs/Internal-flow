# STUDIO_PRO (UI Preview)

Frontend preview of the internal production management UI. **No database** — hardcoded demo logins and mock data.

## Local dev

```bash
cd studio-pro
npm install
npm run dev
```

Open http://localhost:3000/login

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@studio.pro | studio123 |
| Team Lead | lead@studio.pro | studio123 |
| Talent | editor@studio.pro | studio123 |

## Deploy to Vercel

See [VERCEL.md](./VERCEL.md). Set **Root Directory** to `studio-pro`. No `DATABASE_URL` needed.

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm start` — run production server

Design mockups: `../stitch_talentflow_production_management_system/`
