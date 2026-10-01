export const PAGE_SIZE = 12;

export type Sort = "recommended" | "newest" | "price-asc" | "price-desc" | "name-asc";
export type FilterKey = "size" | "colour" | "finish" | "material" | "application";

export type CatalogProduct = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  short_description: string | null;
  price: number;
  sale_price: number | null;
  size_label: string;
  width_mm: number | null;
  height_mm: number | null;
  thickness_mm: number | null;
  colour: string;
  finish: string;
  material: string;
  applications: string[];
  rooms: string[];
  slip_rating: string | null;
  water_absorption: string | null;
  stock_status: string;
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
  category: { name: string; slug: string } | null;
  product_images: { image_url: string; alt_text: string | null }[];
};

export type CatalogState = {
  q: string;
  size: string[];
  colour: string[];
  finish: string[];
  material: string[];
  application: string[];
  minPrice: number | null;
  maxPrice: number | null;
  sort: Sort;
  page: number;
};

export type SearchParams = Record<string, string | string[] | undefined>;

const sortOptions: Sort[] = ["recommended", "newest", "price-asc", "price-desc", "name-asc"];

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function multi(value: string | string[] | undefined) {
  return Array.from(new Set((Array.isArray(value) ? value : value ? [value] : []).map((item) => item.trim()).filter(Boolean)));
}

export function hasIntentionalPriceBound(value: string) {
  const normalized = value.trim();
  if (!normalized) return false;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed >= 0;
}

function nonNegativeNumber(value: string | string[] | undefined) {
  const raw = first(value)?.trim();
  if (!raw || !hasIntentionalPriceBound(raw)) return null;
  return Number(raw);
}

export function parseCatalogState(searchParams: SearchParams): CatalogState {
  const sort = first(searchParams.sort);

  return {
    q: (first(searchParams.q) ?? "").trim().replace(/\s+/g, " "),
    size: multi(searchParams.size),
    colour: multi(searchParams.colour),
    finish: multi(searchParams.finish),
    material: multi(searchParams.material),
    application: multi(searchParams.application),
    minPrice: nonNegativeNumber(searchParams.minPrice),
    maxPrice: nonNegativeNumber(searchParams.maxPrice),
    sort: sortOptions.includes(sort as Sort) ? (sort as Sort) : "recommended",
    page: Math.max(1, Math.floor(nonNegativeNumber(searchParams.page) ?? 1)),
  };
}

export function effectivePrice(product: CatalogProduct) {
  return product.sale_price !== null && product.sale_price < product.price ? product.sale_price : product.price;
}

function overlaps(values: string[], selected: string[]) {
  return selected.length === 0 || values.some((value) => selected.includes(value));
}

export function filterProducts(products: CatalogProduct[], state: CatalogState) {
  const validPriceRange = state.maxPrice === null || state.minPrice === null || state.maxPrice >= state.minPrice;

  return products.filter((product) => {
    const searchable = [product.name, product.sku, product.short_description, product.category?.name, product.colour, product.finish, product.material, product.size_label, ...product.applications]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const searchWords = state.q.toLowerCase().split(" ").filter(Boolean);
    const price = effectivePrice(product);

    return validPriceRange && searchWords.every((word) => searchable.includes(word)) && overlaps([product.size_label], state.size) && overlaps([product.colour], state.colour) && overlaps([product.finish], state.finish) && overlaps([product.material], state.material) && overlaps(product.applications, state.application) && (state.minPrice === null || price >= state.minPrice) && (state.maxPrice === null || price <= state.maxPrice);
  });
}

export function sortProducts(products: CatalogProduct[], sort: Sort) {
  return [...products].sort((left, right) => {
    if (sort === "price-asc") return effectivePrice(left) - effectivePrice(right);
    if (sort === "price-desc") return effectivePrice(right) - effectivePrice(left);
    if (sort === "newest") return Number(right.is_new) - Number(left.is_new) || right.created_at.localeCompare(left.created_at) || left.name.localeCompare(right.name);
    if (sort === "name-asc") return left.name.localeCompare(right.name);
    return Number(right.is_featured) - Number(left.is_featured) || Number(right.is_new) - Number(left.is_new) || left.name.localeCompare(right.name);
  });
}

export function paginate<T>(items: T[], requestedPage: number) {
  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const page = Math.min(requestedPage, pages);
  return { items: items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), page, pages };
}

export function getFilterOptions(products: CatalogProduct[], key: FilterKey) {
  const values = products.flatMap((product) => key === "application" ? product.applications : [product[key === "size" ? "size_label" : key]]);
  return Array.from(new Set(values)).sort();
}
