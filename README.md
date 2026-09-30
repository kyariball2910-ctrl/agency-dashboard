# Agency Dashboard Starter

Per-user lead pipeline with encrypted API key vault, email outreach, AI chat, and pattern-lock admin gate.

## Stack
- Next.js (App Router)
- Supabase (Auth + DB + Edge Functions)
- Tailwind

## Setup

1. Copy `.env.example` → `.env.local` and fill values
2. Run SQL migrations in `supabase/migrations/`
3. Deploy Edge Function:
   ```bash
   supabase secrets set KEY_ENC_SECRET=... SUPABASE_SERVICE_ROLE_KEY=...
   supabase functions deploy keys
   ```
4. `npm install && npm run dev`

## Partner signup link
```
/signup?partner=PAX-XXXXXXXX
```
