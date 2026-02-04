# Wedding Overwhelm Reset

This mini-app currently stores emails and reset payloads in memory. When ready to go live, replace the `/api/signup` handler with a Brevo contact create call (see `src/app/api/brevo/route.ts` for the existing integration pattern) and keep the same `{ ok: true }` response shape.
