// Base URL for CoinGecko API
const BASE_URL = "https://api.coingecko.com/api/v3";

// Generic helper to fetch JSON from API
async function getJson(path) {
  // Make API request
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      accept: "application/json", // Ensure JSON response
    },
  });

  // Handle HTTP errors (e.g., 500, 404)
  if (!response.ok) {
    throw new Error(
      "CoinGecko is unavailable right now. Please try again shortly."
    );
  }

  // Parse and return JSON data
  return response.json();
}

// ---------------- FETCH MARKET DATA ----------------
export async function fetchMarkets() {
  // Query parameters for market data
  const params = new URLSearchParams({
    vs_currency: "usd", // Currency
    order: "market_cap_desc", // Sort by market cap
    per_page: "50", // Limit results
    page: "1",
    sparkline: "true", // Include 7-day sparkline data
    price_change_percentage: "24h", // Include 24h change
  });

  // Call API with query params
  return getJson(`/coins/markets?${params.toString()}`);
}

// ---------------- FETCH TRENDING COINS ----------------
export async function fetchTrending() {
  const data = await getJson(`/search/trending`);

  // Extract only top 5 trending coins safely
  return Array.isArray(data?.coins)
    ? data.coins
        .slice(0, 5) // Limit to 5 items
        .map((c) => c.item) // Extract coin details
    : [];
}

// ---------------- FETCH GLOBAL MARKET DATA ----------------
export async function fetchGlobal() {
  const data = await getJson(`/global`);

  // Return global stats safely (fallback null)
  return data?.data || null;
}