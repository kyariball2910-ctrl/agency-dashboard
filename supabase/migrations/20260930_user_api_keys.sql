create table if not exists public.user_api_keys (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  provider       text not null
                   check (provider in (
                     'vercel', 'github', 'supabase', 'agentmail',
                     'openai', 'anthropic'
                   )),
  ciphertext     text not null,
  iv             text not null,
  last4          text not null check (char_length(last4) = 4),
  meta           jsonb not null default '{}'::jsonb,
  status         text not null default 'untested'
                   check (status in ('untested', 'ok', 'failed')),
  last_tested_at timestamptz,
  last_error     text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique (user_id, provider)
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger user_api_keys_updated_at
  before update on public.user_api_keys
  for each row execute function public.set_updated_at();

alter table public.user_api_keys enable row level security;

create policy "Users can select own keys"
  on public.user_api_keys for select using (auth.uid() = user_id);

create policy "Users can insert own keys"
  on public.user_api_keys for insert with check (auth.uid() = user_id);

create policy "Users can update own keys"
  on public.user_api_keys for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can delete own keys"
  on public.user_api_keys for delete using (auth.uid() = user_id);
