# Booking role access

The Next.js application is the only active frontend. The old React/Vite app should not be deployed.

## Roles

- `authenticated` — customer: creates pending bookings and sees only their own bookings.
- `staff` — sees only bookings assigned to the linked Staff profile.
- `manager` and `admin` — see all bookings.

The roles are created during Strapi bootstrap. Assign a user to a role in **Settings → Users & Permissions plugin → Users**. For a staff user, also open the corresponding Staff entry and set its `user` relation.

## n8n compatibility

The existing n8n workflow must remain unchanged. Its HTTP request continues to send:

```json
{ "data": { "status": "confirmed" } }
```

or `cancelled` to `PUT /api/bookings/:documentId` with its Strapi API token. The booking controller allows this only when the current status is `pending`.

Create or retain an n8n API token that has permission to call the booking update endpoint. Do not expose this token in Next.js environment variables or browser code.

## Permissions

- Public: services/staff `find`, `findOne` only.
- Authenticated: booking `find`, `create`; services/staff `find`, `findOne`.
- Do not grant browser roles booking `update`, `delete`, or `findOne` unless a dedicated controller policy is added.
