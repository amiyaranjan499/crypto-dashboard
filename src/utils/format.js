// ---------------- FORMAT CURRENCY ----------------
export function formatCurrency(value, maximumFractionDigits = 2) {
  // Handle invalid or missing values
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  )
    return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency", // Format as currency
    currency: "USD", // USD format
    // Use compact notation for large values (e.g., 1.2M)
    notation:
      Math.abs(value) >= 1_000_000
        ? "compact"
        : "standard",
    maximumFractionDigits, // Control decimal precision
  }).format(value);
}

// ---------------- FORMAT NUMBER ----------------
export function formatNumber(value) {
  // Handle invalid values
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  )
    return "—";

  return new Intl.NumberFormat("en-US", {
    notation: "compact", // e.g., 1.5K, 2.3M
    maximumFractionDigits: 2,
  }).format(value);
}

// ---------------- FORMAT PERCENT ----------------
export function formatPercent(value) {
  // Handle invalid values
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  )
    return "—";

  // Add "+" sign for positive values
  const sign = value > 0 ? "+" : "";

  return `${sign}${value.toFixed(2)}%`; // Fixed to 2 decimal places
}

// ---------------- FORMAT TIME ----------------
export function formatTime(date) {
  // Handle missing date
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date); // Format as HH:MM:SS
}