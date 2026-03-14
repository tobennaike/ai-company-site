-- Create leads table
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.leads enable row level security;

-- Allow anonymous inserts only (no reads, updates, or deletes)
create policy "Allow anonymous inserts" on public.leads
  for insert
  to anon
  with check (true);
