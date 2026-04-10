-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- 1. User credits table
create table public.user_credits (
  user_id uuid primary key references auth.users(id) on delete cascade,
  credits integer not null default 5,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 2. Generation history table
create table public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  type text not null default 'image',
  endpoint text not null,
  prompt text,
  result_url text,
  credits_used integer not null default 1,
  created_at timestamp with time zone default now()
);

-- 3. Auto-create credits row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_credits (user_id, credits)
  values (new.id, 5);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Enable Row Level Security
alter table public.user_credits enable row level security;
alter table public.generations enable row level security;

-- 5. RLS Policies — users can only read their own data
create policy "Users can view own credits" on public.user_credits
  for select using (auth.uid() = user_id);

create policy "Users can view own generations" on public.generations
  for select using (auth.uid() = user_id);

-- 6. Service role can do everything (for your backend API)
create policy "Service role full access credits" on public.user_credits
  for all using (true) with check (true);

create policy "Service role full access generations" on public.generations
  for all using (true) with check (true);
