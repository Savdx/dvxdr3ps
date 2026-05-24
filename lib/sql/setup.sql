-- Run this once in the Supabase SQL editor before using the site.
drop table if exists public.products cascade;

create table public.products (
  id          bigserial primary key,
  name        text         not null,
  category    text         not null default 'Shoes',
  rating      numeric(3,1) not null default 4.5,
  price       text         not null default '',
  link        text         not null,
  image       text         not null default '',
  created_at  timestamptz  not null default now()
);

-- If the table already exists, add the price column:
-- alter table public.products add column if not exists price text not null default '';

alter table public.products enable row level security;
create policy "Anyone can read"   on public.products for select using (true);
create policy "Service can write" on public.products for all using (true) with check (true);
