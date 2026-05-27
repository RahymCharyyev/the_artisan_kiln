const usdFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats US dollars (e.g. $28.00). */
export function formatUSD(amount: number): string {
  return usdFmt.format(amount);
}
