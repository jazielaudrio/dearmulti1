-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard)

create table if not exists app_config (
  id text primary key default 'main',
  config jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) & Allow Public Read/Write for App Config
alter table app_config enable row level security;

create policy "Public Read Config" on app_config for select using (true);
create policy "Public Insert Config" on app_config for insert with check (true);
create policy "Public Update Config" on app_config for update using (true);
