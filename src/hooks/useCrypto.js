import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchGlobal, fetchMarkets, fetchTrending } from "../services/api";

export function useCrypto() {
  const [coins, setCoins] = useState([]);
  const [trending, setTrending] = useState([]);
  const [global, setGlobal] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  // fetch all data
  const loadAll = useCallback(async ({ silent = false } = {}) => {
    try {
      if (silent) setRefreshing(true);
      else setLoading(true);

      setError("");

      const [marketsRes, trendingRes, globalRes] =
        await Promise.allSettled([
          fetchMarkets(),
          fetchTrending(),
          fetchGlobal(),
        ]);

      // markets (required)
      if (marketsRes.status === "fulfilled") {
        setCoins(marketsRes.value || []);
      } else {
        throw marketsRes.reason;
      }

      // trending (fix: support both API formats)
      if (trendingRes.status === "fulfilled") {
        const data = trendingRes.value;
        setTrending(data?.coins || data || []);
      }

      // global (optional)
      if (globalRes.status === "fulfilled") {
        setGlobal(globalRes.value);
      }

      setLastUpdated(new Date());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load market data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // initial load + auto refresh
  useEffect(() => {
    loadAll();

    const interval = window.setInterval(
      () => loadAll({ silent: true }),
      60000
    );

    return () => window.clearInterval(interval);
  }, [loadAll]);

  // calculate stats
  const stats = useMemo(() => {
    const totalMarketCap = coins.reduce(
      (sum, c) => sum + (c.market_cap || 0),
      0
    );

    const totalVolume = coins.reduce(
      (sum, c) => sum + (c.total_volume || 0),
      0
    );

    const movers = coins.filter((c) =>
      Number.isFinite(c.price_change_percentage_24h)
    );

    return {
      totalMarketCap,
      totalVolume,

      // best performer
      topGainer: movers.reduce(
        (best, c) =>
          !best ||
          c.price_change_percentage_24h >
            best.price_change_percentage_24h
            ? c
            : best,
        null
      ),

      // worst performer
      topLoser: movers.reduce(
        (worst, c) =>
          !worst ||
          c.price_change_percentage_24h <
            worst.price_change_percentage_24h
            ? c
            : worst,
        null
      ),
    };
  }, [coins]);

  return {
    coins,
    trending,
    global,
    loading,
    refreshing,
    error,
    lastUpdated,
    stats,
    refresh: () => loadAll({ silent: true }),
  };
}