export type QueryValue = string | string[] | undefined;

export function catalogueHref(basePath: string, params: Record<string, QueryValue>, changes: Record<string, QueryValue> = {}) {
  const next = { ...params, ...changes };
  const query = new URLSearchParams();

  Object.entries(next).forEach(([key, value]) => {
    if (value === undefined || value === "") return;
    (Array.isArray(value) ? value : [value]).forEach((item) => query.append(key, item));
  });

  const serialized = query.toString();
  return serialized ? `${basePath}?${serialized}` : basePath;
}
