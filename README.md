# Bookly — Salon Booking Management System

A full-stack salon appointment platform with a Next.js customer experience, Strapi content and booking API, and an n8n + Slack approval workflow.

Customers submit appointment requests through the web app. Each booking is stored in Strapi with a `pending` status, sent to Slack through n8n, and then confirmed or cancelled from the Slack approval buttons.

## Highlights

- Responsive Next.js App Router frontend
- Strapi v5 API for services, staff, users, and bookings
- Zustand and Axios for client-side state and API communication
- Role-aware access for customers, staff, managers, and admins
- Server-side booking ownership and appointment-slot validation
- n8n Slack approval flow for booking confirmation and cancellation
- Google Sheets booking append workflow support
- Vercel-ready frontend and Render-ready backend

## Booking approval flow

```text
Customer creates a booking in Next.js
        ↓
Strapi creates a pending booking
        ↓
n8n receives the Strapi booking-created webhook
        ↓
Slack approval message is sent
        ↓
Manager selects Confirm or Cancel in Slack
        ↓
n8n updates the booking status in Strapi
        ↓
Customer sees confirmed or cancelled status in Next.js
```

> The n8n workflow is independent from the frontend. Never expose its Strapi API token in browser code.

## Project structure

```text
.
├── next-frontend/       # Active Next.js frontend
├── salon-backend/       # Strapi v5 backend
│   └── n8n/             # n8n workflow exports
├── n8n/                 # Local n8n configuration, if used
└── README.md
```

The legacy React/Vite frontend has been removed. `next-frontend` is the active web client.

## Technology stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Client state | Zustand |
| HTTP client | Axios |
| Backend | Strapi v5, TypeScript |
| Database | SQLite locally; PostgreSQL recommended for production |
| Automation | n8n, Slack, Google Sheets |
| Deployment | Vercel, Render |

## Roles and access

| Role | Access |
| --- | --- |
| Customer | Creates bookings and sees only their own bookings |
| Staff | Sees bookings assigned to their linked staff profile |
| Manager | Sees all bookings |
| Admin | Sees all bookings and manages application content |
| n8n API token | Updates a pending booking to `confirmed` or `cancelled` only |

The booking status is enforced by Strapi. A browser user cannot create a confirmed booking or directly change a booking status.

## Prerequisites

- Node.js `20.9` or later
- npm
- A Strapi-compatible database
- An n8n instance with Slack credentials configured

If you use NVM:

```bash
nvm use 20
```

## Local development

### 1. Start Strapi

```bash
cd salon-backend
npm install
cp .env.example .env
npm run develop
```

Strapi starts at `http://localhost:1337`. Open `http://localhost:1337/admin` to create the first administrator account.

### 2. Configure and start Next.js

Create `next-frontend/.env.local`:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
```

Then run:

```bash
cd next-frontend
npm install
npm run dev
```

The frontend starts at `http://localhost:3000`.

## Role setup in Strapi

On startup, the backend creates `Staff`, `Manager`, and `Admin` user-permission roles if they do not exist.

1. Go to **Settings → Users & Permissions → Users**.
2. Assign the appropriate role to each user.
3. For a Staff user, open the matching Staff entry in Content Manager and set its `user` relation.

See [salon-backend/ROLE_ACCESS.md](salon-backend/ROLE_ACCESS.md) for n8n token and permission notes.

## n8n and Slack setup

Import the workflow export from:

```text
salon-backend/n8n/strapi-booking-created.json
```

The workflow updates booking status with one of these request bodies:

```json
{ "data": { "status": "confirmed" } }
```

```json
{ "data": { "status": "cancelled" } }
```

Create a Strapi API token for n8n and keep it only in n8n credentials. It must never be placed in `NEXT_PUBLIC_*` environment variables.

## Production deployment

### Strapi on Render

This repository includes [`render.yaml`](render.yaml). In Render, create or
reconfigure the service as a **Blueprint** from this repository. It uses
`salon-backend` as the root directory and automatically deploys each push to
`main`.

If you keep the existing service rather than creating a Blueprint, set its
root directory to `salon-backend`, enable **Auto-Deploy**, and use:

```text
Build command: npm ci && npm run build
Start command: npm run start
```

Required environment variables include:

```env
NODE_VERSION=20.20.2
NODE_ENV=production
APP_KEYS=<comma-separated-random-values>
API_TOKEN_SALT=<random-secret>
ADMIN_JWT_SECRET=<random-secret>
TRANSFER_TOKEN_SALT=<random-secret>
JWT_SECRET=<random-secret>
ENCRYPTION_KEY=<random-secret>
CLIENT_URL=https://next-frontend-gules.vercel.app
DATABASE_CLIENT=postgres
DATABASE_URL=<render-postgres-internal-url>
DATABASE_SSL=false
```

Use Render Postgres for production. Local SQLite records do not automatically transfer to Render.

### Next.js on Vercel

Keep the Git repository root as this repository. In the Vercel project, set
the project root directory to `next-frontend`, connect the `main` production
branch, and enable automatic deployments. A commit made from this repository
root will then deploy frontend changes to Vercel; no separate Git repository
inside `next-frontend` is needed.

Add:

```env
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-service.onrender.com/api
```

Redeploy Vercel whenever a public environment variable changes.

## Verification checklist

- [ ] Customer can register and sign in
- [ ] Customer can create a pending booking
- [ ] n8n sends the Slack approval card
- [ ] Slack Confirm changes the booking to `confirmed`
- [ ] Slack Cancel changes the booking to `cancelled`
- [ ] Customer sees only their own bookings
- [ ] Staff sees only bookings linked to their staff profile

## Security notes

- Never commit `.env` or `.env.local` files.
- Do not share API tokens, Slack secrets, or production passwords.
- Use a restricted n8n API token instead of a full-access production token where possible.
- Payment integration is intentionally deferred; payment status must be verified server-side before it is added to the approval workflow.

## License

This project is private and intended for internal use.
