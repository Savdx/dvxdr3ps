# DvxdR3ps

A Next.js 14 (App Router) website for the DvxdR3ps Chinese rep spreadsheet,
with LoveGoBuy affiliate monetization and a Supabase-backed product catalog.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (REST) for product storage
- Vercel-ready

## Quick start

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Supabase setup

Run `lib/sql/setup.sql` once in the Supabase SQL editor to create the
`products` table and policies.

## Affiliate link

All CTAs that send users to LoveGoBuy use the affiliate URL
`https://www.lovegobuy.com/?invite_code=SA8GJ2` (configured in
`lib/constants.ts`). Affiliate links always open in a new tab with
`rel="noopener noreferrer"`.

## Pages

- `/` — landing page
- `/spreadsheet` — full product grid with filters / search / sort
- `/tutorial` — embedded video + 3 interactive steps
- `/admin` — password-protected admin panel (password: `DvxdR3ps2024!`)

## Admin API

`/api/admin/products` handles `POST` (add) and `DELETE` (remove) requests.
Both require the `x-admin-password` header matching `ADMIN_PASSWORD`. The
Supabase service-role key is only used server-side in this route.

## Languages

EN/FR toggle in the navbar, stored in `localStorage`.
