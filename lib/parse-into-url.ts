export default function parseIntoUrl(
  url: string, filter: Record<string, string | number>
) {
  const parsedFilter = Object.keys(filter ?? {})
    .map((item: string) => {
      const value = filter
        ? (filter[item as keyof typeof filter] as string)
        : "";
      return `${item}=${value}`;
    })
    .join("&");

  return {
    parsedFilter,
    originalUrl: url,
    combined: parsedFilter.trim().length > 0 ? `${url}?${parsedFilter}` : url,
  };
}
