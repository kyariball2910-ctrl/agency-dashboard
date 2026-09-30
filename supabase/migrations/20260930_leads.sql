create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  email         text,
  name          text,
  company       text,
  title         text,
  linkedin_url  text,
  source        text,
  status        text not null default 'new'
                  check (status in ('new', 'contacted', 'replied', 'qualified', 'archived')),
  meta          jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index leads_user_id_idx on public.leads (user_id);
create index leads_status_idx on public.leads (user_id, status);

create trigger leads_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

alter table public.leads enable row level security;

create policy "Users manage own leads"
  on public.leads for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
