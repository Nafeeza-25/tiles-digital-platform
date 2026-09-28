insert into public.product_images (product_id, image_url, alt_text, sort_order, is_primary)
select
  products.id,
  '/images/products/' || products.slug || '.svg',
  products.name || ' ' || lower(products.material) || ' tile demo render',
  0,
  true
from public.products as products
where products.is_active = true
  and not exists (
    select 1
    from public.product_images as images
    where images.product_id = products.id
      and images.image_url = '/images/products/' || products.slug || '.svg'
  );
