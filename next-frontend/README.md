# Next.js frontend migration

This is a separate Next.js App Router frontend. The existing Vite application at the repository root remains unchanged during migration.

## Start locally

Next.js requires Node.js 20.9 or newer. Check with `node --version` before installing.

```bash
cd next-frontend
cp .env.example .env.local
npm install
npm run dev
```

## Migration order

1. Copy shared styles, assets, Navbar, and Footer. ✅
2. Migrate public pages (`/`, `/about`, `/services`, `/team`). ✅
3. Migrate booking creation at `/booking/[id]`.
4. Migrate login, registration, and My Bookings.
5. Migrate admin/dashboard pages.
6. Test Strapi → n8n → Slack approval → Strapi status update before Vercel cutover.

## Route mapping

| Current React Router route | Next.js route |
| --- | --- |
| `/` | `app/page.tsx` |
| `/booking/:id` | `app/booking/[id]/page.tsx` |
| `/my-bookings` | `app/my-bookings/page.tsx` |
| `/payment/success` | `app/payment/success/page.tsx` |

The n8n workflow and Strapi webhook do not need changes: they communicate with Strapi, not the frontend framework.
