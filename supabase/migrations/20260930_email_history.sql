create table if not exists public.email_history (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  lead_id       uuid references public.leads(id) on delete set null,
  to_email      text not null,
  subject       text,
  body          text,
  status        text not null default 'queued'
                  check (status in ('queued', 'sent', 'failed', 'opened', 'replied')),
  provider_id   text,
  error         text,
  sent_at       timestamptz,
  created_at    timestamptz not null default now()
);

create index email_history_user_id_idx on public.email_history (user_id);
create index email_history_lead_id_idx on public.email_history (lead_id);

alter table public.email_history enable row level security;

create policy "Users manage own email history"
  on public.email_history for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
