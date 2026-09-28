-- Initial local schema for the Tiles Digital Platform.
-- This migration is intentionally not applied to the live Supabase project yet.

create extension if not exists pgcrypto;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_name_not_blank check (btrim(name) <> ''),
  constraint categories_slug_not_blank check (btrim(slug) <> '')
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete restrict,
  sku text not null unique,
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  price numeric(10, 2) not null,
  sale_price numeric(10, 2),
  size_label text not null,
  width_mm integer,
  height_mm integer,
  thickness_mm numeric(6, 2),
  colour text not null,
  finish text not null,
  material text not null,
  applications text[] not null default '{}'::text[],
  rooms text[] not null default '{}'::text[],
  slip_rating text,
  water_absorption text,
  stock_status text not null default 'in_stock',
  is_featured boolean not null default false,
  is_new boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_sku_not_blank check (btrim(sku) <> ''),
  constraint products_name_not_blank check (btrim(name) <> ''),
  constraint products_slug_not_blank check (btrim(slug) <> ''),
  constraint products_price_non_negative check (price >= 0),
  constraint products_sale_price_non_negative check (sale_price is null or sale_price >= 0),
  constraint products_sale_price_less_than_price check (sale_price is null or sale_price < price),
  constraint products_width_positive check (width_mm is null or width_mm > 0),
  constraint products_height_positive check (height_mm is null or height_mm > 0),
  constraint products_thickness_positive check (thickness_mm is null or thickness_mm > 0),
  constraint products_stock_status_valid check (
    stock_status in ('in_stock', 'low_stock', 'out_of_stock', 'made_to_order')
  )
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  constraint product_images_url_not_blank check (btrim(image_url) <> ''),
  constraint product_images_sort_order_non_negative check (sort_order >= 0)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  customer_name text not null,
  rating integer not null,
  title text,
  comment text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default now(),
  constraint reviews_customer_name_not_blank check (btrim(customer_name) <> ''),
  constraint reviews_comment_not_blank check (btrim(comment) <> ''),
  constraint reviews_rating_valid check (rating between 1 and 5)
);

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  postal_code text,
  phone text,
  whatsapp text,
  email text,
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  google_maps_url text,
  opening_hours jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint stores_name_not_blank check (btrim(name) <> ''),
  constraint stores_slug_not_blank check (btrim(slug) <> ''),
  constraint stores_city_not_blank check (btrim(city) <> ''),
  constraint stores_state_not_blank check (btrim(state) <> ''),
  constraint stores_latitude_valid check (latitude is null or latitude between -90 and 90),
  constraint stores_longitude_valid check (longitude is null or longitude between -180 and 180),
  constraint stores_sort_order_non_negative check (sort_order >= 0)
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products (id) on delete set null,
  enquiry_type text not null default 'contact',
  name text not null,
  phone text not null,
  email text,
  quantity numeric(12, 2),
  location text,
  message text,
  preferred_contact text not null default 'phone',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint enquiries_type_valid check (
    enquiry_type in ('contact', 'quote', 'product', 'bulk', 'wholesale')
  ),
  constraint enquiries_name_not_blank check (btrim(name) <> ''),
  constraint enquiries_phone_not_blank check (btrim(phone) <> ''),
  constraint enquiries_quantity_positive check (quantity is null or quantity > 0),
  constraint enquiries_preferred_contact_valid check (
    preferred_contact in ('phone', 'whatsapp', 'email')
  ),
  constraint enquiries_status_valid check (
    status in ('new', 'contacted', 'qualified', 'converted', 'closed')
  )
);

create unique index product_images_one_primary_per_product_idx
  on public.product_images (product_id)
  where is_primary;

create index products_category_id_idx on public.products (category_id);
create index products_price_idx on public.products (price);
create index products_colour_idx on public.products (colour);
create index products_finish_idx on public.products (finish);
create index products_material_idx on public.products (material);
create index products_stock_status_idx on public.products (stock_status);
create index products_applications_idx on public.products using gin (applications);
create index products_rooms_idx on public.products using gin (rooms);
create index product_images_product_id_idx on public.product_images (product_id);
create index reviews_product_id_idx on public.reviews (product_id);
create index reviews_product_id_is_approved_idx on public.reviews (product_id, is_approved);
create index stores_city_idx on public.stores (city);
create index stores_is_active_idx on public.stores (is_active);
create index enquiries_created_at_idx on public.enquiries (created_at desc);
create index enquiries_status_idx on public.enquiries (status);
create index enquiries_product_id_idx on public.enquiries (product_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create trigger stores_set_updated_at
before update on public.stores
for each row execute function public.set_updated_at();

create trigger enquiries_set_updated_at
before update on public.enquiries
for each row execute function public.set_updated_at();

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.reviews enable row level security;
alter table public.stores enable row level security;
alter table public.enquiries enable row level security;

revoke all on table public.categories from anon, authenticated;
revoke all on table public.products from anon, authenticated;
revoke all on table public.product_images from anon, authenticated;
revoke all on table public.reviews from anon, authenticated;
revoke all on table public.stores from anon, authenticated;
revoke all on table public.enquiries from anon, authenticated;

grant select on table public.categories to anon, authenticated;
grant select on table public.products to anon, authenticated;
grant select on table public.product_images to anon, authenticated;
grant select on table public.reviews to anon, authenticated;
grant select on table public.stores to anon, authenticated;

grant insert (product_id, customer_name, rating, title, comment)
  on table public.reviews to anon, authenticated;

grant insert (
  product_id,
  enquiry_type,
  name,
  phone,
  email,
  quantity,
  location,
  message,
  preferred_contact
) on table public.enquiries to anon, authenticated;

create policy categories_public_select_active
on public.categories
for select
to anon, authenticated
using (is_active = true);

create policy products_public_select_active
on public.products
for select
to anon, authenticated
using (is_active = true);

create policy product_images_public_select_active_product
on public.product_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.products
    where products.id = product_images.product_id
      and products.is_active = true
  )
);

create policy reviews_public_select_approved
on public.reviews
for select
to anon, authenticated
using (is_approved = true);

create policy reviews_public_insert_unapproved
on public.reviews
for insert
to anon, authenticated
with check (
  is_approved = false
  and exists (
    select 1
    from public.products
    where products.id = reviews.product_id
      and products.is_active = true
  )
);

create policy stores_public_select_active
on public.stores
for select
to anon, authenticated
using (is_active = true);

create policy enquiries_public_insert_new
on public.enquiries
for insert
to anon, authenticated
with check (status = 'new');
