export function formatCurrency(
  value: number,
  currency: string = "EUR",
  locale?: string,
) {
  const resolvedLocale =
    locale ||
    document?.documentElement?.lang ||
    navigator?.language ||
    "es-ES";

  try {
    return new Intl.NumberFormat(resolvedLocale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    const symbol = currency === "EUR" ? "€" : "";
    return `${value.toFixed(2)}${symbol}`;
  }
}
