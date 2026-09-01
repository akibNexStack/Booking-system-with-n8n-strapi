# Booking System Client

A modern booking platform frontend built with React, TypeScript, Vite, and Tailwind CSS.

This client app is designed for managing services, bookings, user authentication, and admin analytics.

## Features

- Public homepage with hero, services, how it works, testimonials, team, and about sections
- User authentication flows for login, registration, and OTP verification
- Protected user dashboard with booking history and appointment details
- Booking pages with service selection, staff scheduling, and confirmation UI
- Admin dashboard pages for stats, revenue charts, recent bookings, and activity feed
- API connectivity via Axios and RTK Query with refresh token handling

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Redux Toolkit + RTK Query
- React Router v7
- Axios
- Zod
- Radix UI
- Lucide icons
- Sonner notifications

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm, yarn, or pnpm

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root with the backend base URL:

```env
VITE_BASE_URL=https://example.com/api/v1
```

The frontend uses `src/config/index.ts` to read the API base URL.

### Run the development server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## Project structure

- `src/App.tsx` — main app shell and layout container
- `src/routes/index.tsx` — route definitions and protected routes
- `src/pages` — page-level components for homepage, auth, bookings, user dashboard, and admin dashboard
- `src/components` — reusable UI modules, layout components, and feature widgets
- `src/redux` — Redux store and RTK Query API slices
- `src/config` — runtime configuration values
- `src/lib/axios.ts` — Axios instance with interceptor and token refresh support
- `src/utils` — helpers for routes, auth wrappers, and sidebar items

## API expectations

The client expects a backend API at `VITE_BASE_URL` with endpoints such as:

- `POST /auth/login`
- `POST /user/register`
- `POST /otp/send`
- `POST /otp/verify`
- `POST /auth/logout`
- `POST /auth/refresh-token`
- `GET /user/me`

If the backend is not available, some UI flows may rely on mocked data for demonstration.

## Notes

- The app uses role-based auth wrappers in `src/utils/withAuth.tsx`.
- User sidebar items and route generation are configured in `src/routes/userSidebarItems.ts` and `src/utils/generateRoutes.ts`.
- Admin dashboard content is rendered in `src/pages/Admin/AdminDashboard.tsx`.

## License

This repository does not include a license file. Add one before publishing or sharing publicly.
# Booking_System_Client
