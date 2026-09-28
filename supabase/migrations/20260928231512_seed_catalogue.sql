-- Fictional academic-demo catalogue data for Timeless Tiles.
-- All prices are demo INR per square metre. No product images or enquiries are seeded here.

insert into public.categories (name, slug, description, sort_order, is_active)
values
  ('Floor Tiles', 'floor-tiles', 'Durable indoor floor tiles for living spaces, bedrooms, and commercial projects.', 1, true),
  ('Wall Tiles', 'wall-tiles', 'Decorative wall tiles for feature walls, everyday interiors, and easy-care surfaces.', 2, true),
  ('Bathroom Tiles', 'bathroom-tiles', 'Practical moisture-aware tile options for bathroom floors and walls.', 3, true),
  ('Kitchen Tiles', 'kitchen-tiles', 'Easy-to-maintain kitchen wall and splashback tile selections.', 4, true),
  ('Outdoor Tiles', 'outdoor-tiles', 'Textured and durable tiles for balconies, patios, and exterior settings.', 5, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

with product_data (
  category_slug, sku, name, slug, short_description, description, price, sale_price,
  size_label, width_mm, height_mm, thickness_mm, colour, finish, material,
  applications, rooms, slip_rating, water_absorption, stock_status, is_featured, is_new
) as (
  values
    ('floor-tiles', 'TT-FLR-001', 'Carrara White', 'carrara-white', 'White marble-look porcelain for bright, open floor plans.', 'Carrara White combines a calm white base with soft grey veining for clean contemporary rooms. The large format reduces grout lines and suits coordinated residential or commercial interiors.', 2450, 2190, '600 × 1200 mm', 600, 1200, 9.5, 'White', 'Polished', 'Glazed Vitrified', array['floor','indoor']::text[], array['living_room','bedroom','commercial']::text[], 'R9', '< 0.5%', 'in_stock', true, false),
    ('floor-tiles', 'TT-FLR-002', 'Calacatta Gold', 'calacatta-gold', 'Warm marble-look floor tile with fine gold-toned movement.', 'Calacatta Gold adds an ivory-white surface with restrained warm veining. It is designed for statement floors where a polished finish supports a refined visual direction.', 2750, 2490, '600 × 1200 mm', 600, 1200, 9.5, 'Ivory', 'Polished', 'Glazed Vitrified', array['floor','indoor']::text[], array['living_room','bedroom']::text[], 'R9', '< 0.5%', 'made_to_order', true, false),
    ('floor-tiles', 'TT-FLR-003', 'Urban Concrete Grey', 'urban-concrete-grey', 'Matte grey floor tile with a balanced concrete-inspired surface.', 'Urban Concrete Grey offers a mid-grey tone that works with industrial and modern interior palettes. Its matte surface is intended for practical everyday floor areas with a quiet visual texture.', 1450, null, '600 × 600 mm', 600, 600, 9.0, 'Grey', 'Matte', 'Vitrified', array['floor','indoor']::text[], array['living_room','bedroom','commercial']::text[], 'R10', '< 0.5%', 'in_stock', false, true),
    ('floor-tiles', 'TT-FLR-004', 'Sahara Beige', 'sahara-beige', 'Soft beige floor tile for warm, versatile interiors.', 'Sahara Beige uses a gentle sand-inspired colour with a subtle satin sheen. The square format works well across bedrooms and living areas where a softer neutral floor is preferred.', 1250, null, '600 × 600 mm', 600, 600, 8.5, 'Beige', 'Satin', 'Vitrified', array['floor','indoor']::text[], array['living_room','bedroom']::text[], 'R9', '< 0.5%', 'in_stock', false, false),
    ('floor-tiles', 'TT-FLR-005', 'Nero Marquina', 'nero-marquina', 'Deep black marble-look tile with contrasting pale veins.', 'Nero Marquina creates visual contrast through a charcoal-black surface and fine white veining. It is a demo premium option for feature zones and carefully lit interior floors.', 2650, 2390, '600 × 1200 mm', 600, 1200, 9.5, 'Black', 'Polished', 'Glazed Vitrified', array['floor','indoor']::text[], array['living_room','commercial']::text[], 'R9', '< 0.5%', 'low_stock', true, false),
    ('floor-tiles', 'TT-FLR-006', 'Oakwood Natural', 'oakwood-natural', 'Wood-look plank tile in a natural brown tone.', 'Oakwood Natural brings the linear character of timber into a ceramic-friendly floor format. The matte finish is suited to bedrooms and living spaces seeking a warmer material mix.', 1680, null, '200 × 1200 mm', 200, 1200, 9.0, 'Brown', 'Matte', 'Porcelain', array['floor','indoor']::text[], array['living_room','bedroom']::text[], 'R10', '< 0.5%', 'in_stock', false, true),
    ('floor-tiles', 'TT-FLR-007', 'Terrazzo Pearl', 'terrazzo-pearl', 'Light terrazzo-style floor tile with a fine speckled pattern.', 'Terrazzo Pearl has a light base with small tonal flecks that add detail without overpowering a room. Its satin finish is planned for flexible indoor areas including boutique commercial settings.', 1550, null, '600 × 600 mm', 600, 600, 8.5, 'Ivory', 'Satin', 'Vitrified', array['floor','indoor']::text[], array['living_room','commercial']::text[], 'R9', '< 0.5%', 'in_stock', false, false),
    ('floor-tiles', 'TT-FLR-008', 'Slate Graphite', 'slate-graphite', 'Textured graphite tile for contemporary interior floors.', 'Slate Graphite uses layered charcoal shading to suggest a natural stone surface. The textured finish provides a grounded option for entrances, commercial floors, and modern rooms.', 1780, null, '600 × 600 mm', 600, 600, 10.0, 'Charcoal', 'Textured', 'Stone-look Porcelain', array['floor','indoor']::text[], array['living_room','commercial']::text[], 'R10', '< 0.5%', 'in_stock', false, false),
    ('wall-tiles', 'TT-WAL-001', 'Arctic Subway White', 'arctic-subway-white', 'Classic glossy white wall tile in a compact subway format.', 'Arctic Subway White gives kitchens and utility walls a simple bright surface. Its glossy finish reflects light while the compact format supports traditional or contemporary layouts.', 890, null, '75 × 300 mm', 75, 300, 7.0, 'White', 'Glossy', 'Ceramic', array['wall','indoor']::text[], array['kitchen','bathroom']::text[], null, '> 10%', 'in_stock', true, false),
    ('wall-tiles', 'TT-WAL-002', 'Sage Gloss', 'sage-gloss', 'Glossy green wall tile for calm interior accents.', 'Sage Gloss introduces a clear green tone for splashbacks and feature walls. The slim rectangular format gives designers a measured way to add colour in smaller spaces.', 990, null, '100 × 300 mm', 100, 300, 7.0, 'Green', 'Glossy', 'Ceramic', array['wall','indoor']::text[], array['kitchen','bathroom']::text[], null, '> 10%', 'in_stock', false, true),
    ('wall-tiles', 'TT-WAL-003', 'Ocean Blue Ripple', 'ocean-blue-ripple', 'Textured blue wall tile with a gentle rippled face.', 'Ocean Blue Ripple adds a water-inspired texture that catches light across vertical surfaces. It is intended for bathroom walls and controlled feature areas where colour and relief matter.', 1180, 1040, '300 × 600 mm', 300, 600, 8.0, 'Blue', 'Textured', 'Ceramic', array['wall','indoor','wet_area']::text[], array['bathroom']::text[], null, '3–6%', 'low_stock', true, false),
    ('wall-tiles', 'TT-WAL-004', 'Sandstone Linear', 'sandstone-linear', 'Beige linear wall tile with a restrained stone-like texture.', 'Sandstone Linear offers a warm beige background with understated directional detail. It is designed for wall surfaces that need a natural texture without a heavy pattern.', 1120, null, '300 × 600 mm', 300, 600, 8.0, 'Beige', 'Matte', 'Ceramic', array['wall','indoor']::text[], array['living_room','bathroom']::text[], null, '3–6%', 'in_stock', false, false),
    ('wall-tiles', 'TT-WAL-005', 'Ivory Travertine', 'ivory-travertine', 'Ivory travertine-look wall tile in a generous format.', 'Ivory Travertine balances warm ivory colour with a softly layered stone pattern. The satin finish is intended for larger walls in living rooms, bathrooms, and hospitality-style settings.', 1340, null, '600 × 1200 mm', 600, 1200, 9.0, 'Ivory', 'Satin', 'Stone-look Porcelain', array['wall','indoor']::text[], array['living_room','bathroom','commercial']::text[], null, '< 0.5%', 'made_to_order', false, false),
    ('wall-tiles', 'TT-WAL-006', 'Charcoal Flute', 'charcoal-flute', 'Charcoal fluted wall tile for architectural feature panels.', 'Charcoal Flute uses vertical ridges to create shadow and rhythm across a wall. It works best in small feature zones where a dark textured element can anchor the room.', 1380, null, '300 × 600 mm', 300, 600, 8.0, 'Charcoal', 'Textured', 'Ceramic', array['wall','indoor']::text[], array['living_room','commercial']::text[], null, '3–6%', 'in_stock', false, false),
    ('wall-tiles', 'TT-WAL-007', 'Blush Rose', 'blush-rose', 'Soft rose wall tile with a satin decorative finish.', 'Blush Rose provides a muted rose colour for gentle accent walls and vanity zones. Its satin surface keeps the colour soft rather than mirror-like in indoor lighting.', 1020, null, '300 × 450 mm', 300, 450, 8.0, 'Rose', 'Satin', 'Ceramic', array['wall','indoor']::text[], array['bathroom','bedroom']::text[], null, '3–6%', 'in_stock', false, false),
    ('wall-tiles', 'TT-WAL-008', 'Pearl Mosaic', 'pearl-mosaic', 'Small-format pearl mosaic for detailed wall areas.', 'Pearl Mosaic is a pale white mosaic designed for niche walls, splashbacks, and trim details. Its glossy surface brings small highlights to compact wet-area applications.', 1580, null, '300 × 300 mm', 300, 300, 6.5, 'White', 'Glossy', 'Ceramic', array['wall','indoor','wet_area']::text[], array['bathroom','kitchen']::text[], null, '> 10%', 'in_stock', false, true),
    ('bathroom-tiles', 'TT-BTH-001', 'Aqua Mist Anti-Skid', 'aqua-mist-anti-skid', 'Blue-grey anti-skid bathroom floor tile.', 'Aqua Mist Anti-Skid has a calm blue-grey tone with a practical textured surface. It is planned for bathroom floors where a more tactile finish is preferred in this demo catalogue.', 1290, null, '300 × 300 mm', 300, 300, 9.0, 'Blue', 'Anti-Skid', 'Porcelain', array['floor','wall','indoor','wet_area']::text[], array['bathroom']::text[], 'R11', '< 0.5%', 'in_stock', true, false),
    ('bathroom-tiles', 'TT-BTH-002', 'Spa Stone Grey', 'spa-stone-grey', 'Matte grey bathroom tile with a quiet stone appearance.', 'Spa Stone Grey uses a balanced grey tone to coordinate floor and wall zones. Its matte finish is designed for clean bathroom schemes that need visual calm and easy pairing.', 1380, null, '300 × 600 mm', 300, 600, 9.0, 'Grey', 'Matte', 'Stone-look Porcelain', array['floor','wall','indoor','wet_area']::text[], array['bathroom']::text[], 'R10', '< 0.5%', 'in_stock', false, false),
    ('bathroom-tiles', 'TT-BTH-003', 'Coastal Blue', 'coastal-blue', 'Glossy blue wall tile for fresh bathroom interiors.', 'Coastal Blue brings a deeper blue accent to shower walls and vanity backdrops. The glossy finish helps the colour respond to changing bathroom light without adding a busy pattern.', 1160, null, '300 × 600 mm', 300, 600, 8.0, 'Blue', 'Glossy', 'Ceramic', array['wall','indoor','wet_area']::text[], array['bathroom']::text[], null, '3–6%', 'in_stock', false, true),
    ('bathroom-tiles', 'TT-BTH-004', 'Cloud White', 'cloud-white', 'Simple white bathroom wall tile with a glossy finish.', 'Cloud White is a dependable white tile for bright bathroom walls and compact spaces. Its clean surface can be paired with coloured fixtures, mosaics, or textured floor tiles.', 920, null, '300 × 450 mm', 300, 450, 7.5, 'White', 'Glossy', 'Ceramic', array['wall','indoor','wet_area']::text[], array['bathroom']::text[], null, '> 10%', 'in_stock', false, false),
    ('bathroom-tiles', 'TT-BTH-005', 'Pebble Taupe', 'pebble-taupe', 'Taupe textured tile for tactile bathroom flooring.', 'Pebble Taupe has a small-scale stone effect that adds warmth to bathroom floors. The textured finish is intended to complement neutral wall tiles in wet-area layouts.', 1420, null, '400 × 400 mm', 400, 400, 9.5, 'Beige', 'Textured', 'Porcelain', array['floor','indoor','wet_area']::text[], array['bathroom']::text[], 'R10', '< 0.5%', 'low_stock', false, false),
    ('bathroom-tiles', 'TT-BTH-006', 'Nordic Beige', 'nordic-beige', 'Light beige satin tile for coordinated bathroom surfaces.', 'Nordic Beige uses a pale neutral colour that works across walls and floors in a restrained scheme. The satin finish provides a soft alternative to high gloss in larger bathroom layouts.', 1480, null, '600 × 600 mm', 600, 600, 9.0, 'Beige', 'Satin', 'Vitrified', array['floor','wall','indoor','wet_area']::text[], array['bathroom']::text[], 'R9', '< 0.5%', 'in_stock', false, true),
    ('bathroom-tiles', 'TT-BTH-007', 'Graphite Grip', 'graphite-grip', 'Dark graphite anti-skid tile for durable wet-area floors.', 'Graphite Grip has a dense charcoal surface with a functional anti-skid finish. It is a demo option for bathroom floors and utility wet zones that need stronger contrast.', 1540, null, '300 × 300 mm', 300, 300, 10.0, 'Charcoal', 'Anti-Skid', 'Porcelain', array['floor','indoor','wet_area']::text[], array['bathroom']::text[], 'R11', '< 0.5%', 'in_stock', false, false),
    ('bathroom-tiles', 'TT-BTH-008', 'Marble Vein White', 'marble-vein-white', 'White marble-look tile for polished bathroom walls.', 'Marble Vein White pairs a white field with slender grey movement for a classic bathroom look. The large format is suited to feature walls where fewer joints create a quieter composition.', 2380, 2140, '600 × 1200 mm', 600, 1200, 9.5, 'White', 'Polished', 'Glazed Vitrified', array['wall','indoor','wet_area']::text[], array['bathroom']::text[], null, '< 0.5%', 'in_stock', true, false),
    ('kitchen-tiles', 'TT-KIT-001', 'Metro White Gloss', 'metro-white-gloss', 'Bright white metro tile for kitchen splashbacks.', 'Metro White Gloss is a compact white wall tile for practical kitchen splashback layouts. Its glossy face reflects available light and works with both warm and cool cabinetry colours.', 880, null, '75 × 300 mm', 75, 300, 7.0, 'White', 'Glossy', 'Ceramic', array['wall','indoor']::text[], array['kitchen']::text[], null, '> 10%', 'in_stock', false, false),
    ('kitchen-tiles', 'TT-KIT-002', 'Olive KitKat', 'olive-kitkat', 'Slim green finger tile for detailed kitchen accents.', 'Olive KitKat uses narrow tile strips to create a rhythmic splashback surface. The glossy green finish is planned for small feature areas where colour can be used with restraint.', 1460, 1290, '100 × 300 mm', 100, 300, 7.0, 'Green', 'Glossy', 'Ceramic', array['wall','indoor']::text[], array['kitchen']::text[], null, '> 10%', 'in_stock', true, false),
    ('kitchen-tiles', 'TT-KIT-003', 'Terracotta Brick', 'terracotta-brick', 'Matte terracotta wall tile with a handmade-inspired look.', 'Terracotta Brick adds a warm earthen tone to kitchen splashbacks and serving areas. Its matte surface provides visual depth while keeping the pattern focused on the tile format.', 1080, null, '75 × 300 mm', 75, 300, 7.5, 'Terracotta', 'Matte', 'Ceramic', array['wall','indoor']::text[], array['kitchen']::text[], null, '> 10%', 'in_stock', false, false),
    ('kitchen-tiles', 'TT-KIT-004', 'Smoke Grey', 'smoke-grey', 'Satin grey wall tile for understated kitchen schemes.', 'Smoke Grey gives kitchen walls a neutral mid-tone that pairs with light or dark cabinetry. The rectangular format supports simple stacked, offset, or vertical layout concepts.', 980, null, '300 × 450 mm', 300, 450, 8.0, 'Grey', 'Satin', 'Ceramic', array['wall','indoor']::text[], array['kitchen']::text[], null, '3–6%', 'in_stock', false, false),
    ('kitchen-tiles', 'TT-KIT-005', 'Cream Zellige', 'cream-zellige', 'Cream textured wall tile with irregular visual movement.', 'Cream Zellige has a soft cream colour and a gently varied face for expressive kitchen walls. The glossy finish adds small highlights while preserving a handcrafted visual direction.', 1390, null, '100 × 300 mm', 100, 300, 7.0, 'Ivory', 'Glossy', 'Ceramic', array['wall','indoor']::text[], array['kitchen']::text[], null, '> 10%', 'low_stock', false, true),
    ('kitchen-tiles', 'TT-KIT-006', 'Midnight Blue', 'midnight-blue', 'Deep blue glossy tile for bold kitchen splashbacks.', 'Midnight Blue brings a dark blue accent to kitchen walls without changing the practical tile format. It is intended for focused splashback zones and pairs well with light worktop materials.', 1240, 1090, '75 × 300 mm', 75, 300, 7.0, 'Blue', 'Glossy', 'Ceramic', array['wall','indoor']::text[], array['kitchen']::text[], null, '> 10%', 'in_stock', true, false),
    ('kitchen-tiles', 'TT-KIT-007', 'Sage Hex', 'sage-hex', 'Small green hex tile for playful kitchen details.', 'Sage Hex uses a geometric small format for splashbacks, niches, and limited feature panels. Its satin green surface adds colour while keeping the overall field easy to coordinate.', 1520, null, '200 × 230 mm', 200, 230, 7.0, 'Green', 'Satin', 'Ceramic', array['wall','indoor']::text[], array['kitchen']::text[], null, '> 10%', 'in_stock', false, true),
    ('kitchen-tiles', 'TT-KIT-008', 'Carrara Splash', 'carrara-splash', 'Marble-look kitchen wall tile with a polished white surface.', 'Carrara Splash uses restrained grey veining to bring a marble-inspired note to a kitchen splashback. The larger format is suited to broad wall runs where a clean visual field is useful.', 1280, null, '300 × 600 mm', 300, 600, 8.0, 'White', 'Polished', 'Glazed Vitrified', array['wall','indoor']::text[], array['kitchen']::text[], null, '< 0.5%', 'in_stock', false, false),
    ('outdoor-tiles', 'TT-OUT-001', 'Stonecrest Grey', 'stonecrest-grey', 'Textured grey outdoor floor tile for patios and balconies.', 'Stonecrest Grey has a layered stone appearance with a practical textured face. It is planned for exterior floors where a neutral grey surface can support planting and outdoor furniture.', 1680, 1490, '600 × 600 mm', 600, 600, 10.0, 'Grey', 'Textured', 'Stone-look Porcelain', array['floor','outdoor']::text[], array['balcony','outdoor']::text[], 'R11', '< 0.5%', 'in_stock', true, false),
    ('outdoor-tiles', 'TT-OUT-002', 'Rustic Terracotta', 'rustic-terracotta', 'Terracotta outdoor tile with a warm matte finish.', 'Rustic Terracotta adds an earthy colour to balconies, patios, and garden edges. Its matte surface supports a relaxed outdoor character without relying on a glossy treatment.', 1420, null, '400 × 400 mm', 400, 400, 10.0, 'Terracotta', 'Matte', 'Porcelain', array['floor','outdoor']::text[], array['balcony','outdoor']::text[], 'R10', '< 0.5%', 'in_stock', false, false),
    ('outdoor-tiles', 'TT-OUT-003', 'Granite Charcoal', 'granite-charcoal', 'Charcoal granite-look tile for hard-wearing exterior floors.', 'Granite Charcoal uses a dense speckled pattern for outdoor paths and commercial approaches. The anti-skid finish is intended for areas where a more tactile surface is useful.', 1890, null, '600 × 600 mm', 600, 600, 11.0, 'Charcoal', 'Anti-Skid', 'Stone-look Porcelain', array['floor','outdoor']::text[], array['balcony','outdoor','commercial']::text[], 'R11', '< 0.5%', 'made_to_order', false, false),
    ('outdoor-tiles', 'TT-OUT-004', 'Sand Dune Beige', 'sand-dune-beige', 'Beige textured outdoor tile for light exterior settings.', 'Sand Dune Beige provides a pale sand tone for terraces and balcony floors. Its textured surface is designed to keep the visual finish grounded in bright outdoor light.', 1570, null, '600 × 600 mm', 600, 600, 10.0, 'Beige', 'Textured', 'Porcelain', array['floor','outdoor']::text[], array['balcony','outdoor']::text[], 'R10', '< 0.5%', 'in_stock', false, true),
    ('outdoor-tiles', 'TT-OUT-005', 'Wooddeck Walnut', 'wooddeck-walnut', 'Walnut wood-look porcelain plank for exterior decks.', 'Wooddeck Walnut offers a deep brown plank appearance for outdoor dining and balcony zones. The textured porcelain surface is a demo alternative to natural timber in exposed settings.', 2160, 1950, '200 × 1200 mm', 200, 1200, 10.0, 'Brown', 'Textured', 'Porcelain', array['floor','outdoor']::text[], array['balcony','outdoor']::text[], 'R11', '< 0.5%', 'in_stock', true, false),
    ('outdoor-tiles', 'TT-OUT-006', 'Basalt Black', 'basalt-black', 'Dark basalt-look tile for striking exterior floors.', 'Basalt Black uses a nearly black stone appearance for contemporary patios and outdoor thresholds. The matte surface keeps the finish restrained while supporting strong architectural contrast.', 2280, null, '600 × 1200 mm', 600, 1200, 11.0, 'Black', 'Matte', 'Stone-look Porcelain', array['floor','outdoor']::text[], array['balcony','outdoor','commercial']::text[], 'R10', '< 0.5%', 'low_stock', false, false),
    ('outdoor-tiles', 'TT-OUT-007', 'Canyon Brown', 'canyon-brown', 'Brown textured tile for rustic exterior paths and patios.', 'Canyon Brown carries layered brown tones that suit garden-facing floors and informal commercial entrances. The anti-skid finish is selected for this demo outdoor use case.', 1760, null, '400 × 400 mm', 400, 400, 10.5, 'Brown', 'Anti-Skid', 'Porcelain', array['floor','outdoor']::text[], array['balcony','outdoor','commercial']::text[], 'R11', '< 0.5%', 'in_stock', false, false),
    ('outdoor-tiles', 'TT-OUT-008', 'Travertine Sand', 'travertine-sand', 'Sand-coloured travertine-look tile for outdoor floors.', 'Travertine Sand gives exterior areas a light stone-inspired palette with a satin textured finish. It is intended for patios and balconies that need a neutral foundation around landscaping.', 1840, null, '600 × 600 mm', 600, 600, 10.0, 'Beige', 'Satin', 'Stone-look Porcelain', array['floor','outdoor']::text[], array['balcony','outdoor']::text[], 'R10', '< 0.5%', 'out_of_stock', false, false)
)
insert into public.products (
  category_id, sku, name, slug, short_description, description, price, sale_price,
  size_label, width_mm, height_mm, thickness_mm, colour, finish, material,
  applications, rooms, slip_rating, water_absorption, stock_status, is_featured, is_new, is_active
)
select
  categories.id, product_data.sku, product_data.name, product_data.slug,
  product_data.short_description, product_data.description, product_data.price, product_data.sale_price,
  product_data.size_label, product_data.width_mm, product_data.height_mm, product_data.thickness_mm,
  product_data.colour, product_data.finish, product_data.material, product_data.applications,
  product_data.rooms, product_data.slip_rating, product_data.water_absorption, product_data.stock_status,
  product_data.is_featured, product_data.is_new, true
from product_data
join public.categories on categories.slug = product_data.category_slug
on conflict (sku) do nothing;

insert into public.stores (
  name, slug, address_line1, address_line2, city, state, postal_code, phone, whatsapp, email,
  latitude, longitude, google_maps_url, opening_hours, is_active, sort_order
)
values
  ('Timeless Tiles Central Showroom', 'timeless-tiles-central', '101 Demo Avenue', 'Central Display District', 'Sample City', 'Demo State', '400001', '+91 90000 00001', '+91 90000 00001', 'central@timelesstiles.demo', null, null, null, '{"monday":"09:30-18:30","tuesday":"09:30-18:30","wednesday":"09:30-18:30","thursday":"09:30-18:30","friday":"09:30-18:30","saturday":"09:30-18:30","sunday":"10:00-14:00"}'::jsonb, true, 1),
  ('Timeless Tiles Design Studio', 'timeless-tiles-design-studio', '22 Concept Lane', 'Studio Quarter', 'Sample City', 'Demo State', '400002', '+91 90000 00002', '+91 90000 00002', 'studio@timelesstiles.demo', null, null, null, '{"monday":"10:00-18:00","tuesday":"10:00-18:00","wednesday":"10:00-18:00","thursday":"10:00-18:00","friday":"10:00-18:00","saturday":"10:00-17:00","sunday":"Closed"}'::jsonb, true, 2),
  ('Timeless Tiles Trade Centre', 'timeless-tiles-trade-centre', '8 Commerce Road', 'Trade Park', 'Sample City', 'Demo State', '400003', '+91 90000 00003', '+91 90000 00003', 'trade@timelesstiles.demo', null, null, null, '{"monday":"09:00-18:00","tuesday":"09:00-18:00","wednesday":"09:00-18:00","thursday":"09:00-18:00","friday":"09:00-18:00","saturday":"09:00-16:00","sunday":"Closed"}'::jsonb, true, 3)
on conflict (slug) do update set
  name = excluded.name,
  address_line1 = excluded.address_line1,
  address_line2 = excluded.address_line2,
  city = excluded.city,
  state = excluded.state,
  postal_code = excluded.postal_code,
  phone = excluded.phone,
  whatsapp = excluded.whatsapp,
  email = excluded.email,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  google_maps_url = excluded.google_maps_url,
  opening_hours = excluded.opening_hours,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order;

with review_data (product_slug, customer_name, rating, title, comment, is_approved) as (
  values
    ('carrara-white', 'Asha K.', 5, 'Bright and balanced', 'The white tone worked well with a calm living room palette.', true),
    ('calacatta-gold', 'Rahul M.', 4, 'Warm detail', 'The subtle gold-toned veining gave the sample board a premium look.', true),
    ('urban-concrete-grey', 'Priya S.', 5, 'Easy neutral choice', 'The grey finish matched modern furniture colours without feeling cold.', true),
    ('sahara-beige', 'Arun V.', 4, 'Soft floor colour', 'A useful beige option for rooms that need a warmer base tone.', true),
    ('nero-marquina', 'Meera R.', 4, 'Strong feature surface', 'The dark marble pattern created a clear contrast in the design sample.', true),
    ('oakwood-natural', 'Kiran P.', 5, 'Convincing plank format', 'The long plank size gave the floor layout a natural rhythm.', true),
    ('arctic-subway-white', 'Nisha T.', 5, 'Clean backsplash look', 'The compact white format was easy to combine with colourful kitchen accessories.', true),
    ('ocean-blue-ripple', 'Dev A.', 4, 'Good wall texture', 'The ripple surface added detail without making the bathroom wall busy.', true),
    ('ivory-travertine', 'Sonal J.', 4, 'Gentle stone effect', 'The ivory colour coordinated neatly with timber and brushed metal samples.', true),
    ('blush-rose', 'Ravi P.', 3, 'Soft accent option', 'The rose tone is best used in a small feature area rather than a full room.', true),
    ('aqua-mist-anti-skid', 'Asha K.', 5, 'Useful bathroom grip', 'The textured sample felt appropriate for a practical bathroom floor concept.', true),
    ('spa-stone-grey', 'Rahul M.', 4, 'Calm bathroom finish', 'The matte grey surface made it simple to match wall and floor zones.', true),
    ('coastal-blue', 'Priya S.', 5, 'Fresh colour', 'The blue shade brought a clear focal point to the bathroom mood board.', true),
    ('pebble-taupe', 'Arun V.', 4, 'Warm texture', 'The taupe pattern added interest while remaining easy to coordinate.', true),
    ('marble-vein-white', 'Meera R.', 5, 'Polished wall option', 'The larger white format kept the bathroom presentation looking uncluttered.', true),
    ('metro-white-gloss', 'Kiran P.', 4, 'Reliable kitchen basic', 'The white gloss tile is a flexible choice for a simple splashback layout.', true),
    ('olive-kitkat', 'Nisha T.', 5, 'Great green detail', 'The narrow format made a kitchen accent feel considered and modern.', true),
    ('terracotta-brick', 'Dev A.', 4, 'Warm kitchen tone', 'The terracotta colour added a relaxed contrast to pale cabinetry samples.', true),
    ('midnight-blue', 'Sonal J.', 4, 'Bold but usable', 'The dark blue tile created a focused splashback without overwhelming the plan.', true),
    ('sage-hex', 'Ravi P.', 5, 'Playful format', 'The small hex shape worked well for a compact kitchen feature panel.', true),
    ('stonecrest-grey', 'Asha K.', 5, 'Practical outdoor texture', 'The textured grey surface suited a balcony material board.', true),
    ('rustic-terracotta', 'Rahul M.', 4, 'Warm patio feel', 'The matte terracotta colour supported a relaxed outdoor concept.', true),
    ('granite-charcoal', 'Priya S.', 4, 'Solid exterior choice', 'The charcoal texture felt appropriate for an outdoor entry sample.', true),
    ('wooddeck-walnut', 'Arun V.', 5, 'Outdoor plank effect', 'The walnut plank format gave a balcony board more warmth.', true),
    ('travertine-sand', 'Meera R.', 4, 'Pending moderation', 'The sand tone looks suitable for a light patio concept.', false)
)
insert into public.reviews (product_id, customer_name, rating, title, comment, is_approved)
select products.id, review_data.customer_name, review_data.rating, review_data.title, review_data.comment, review_data.is_approved
from review_data
join public.products on products.slug = review_data.product_slug
where not exists (
  select 1
  from public.reviews existing_reviews
  where existing_reviews.product_id = products.id
    and existing_reviews.customer_name = review_data.customer_name
    and existing_reviews.comment = review_data.comment
);
