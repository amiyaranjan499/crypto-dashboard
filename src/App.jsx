import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

import CoinDrawer from "./components/CoinDrawer";
import CoinTable from "./components/CoinTable";
import ErrorState from "./components/ErrorState";
import GlobalBar from "./components/GlobalBar";
import Header from "./components/Header";
import MoversSection from "./components/MoversSection";
import TopCards from "./components/TopCards";
import TrendingCoins from "./components/TrendingCoins";

import { useCrypto } from "./hooks/useCrypto";
import { useDebounce } from "./hooks/useDebounce";
import { useFavorites } from "./hooks/useFavorites";
import { useTheme } from "./hooks/useTheme";

import "./App.css";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  const {
    coins,
    trending,
    global,
    loading,
    refreshing,
    error,
    lastUpdated,
    stats,
    refresh,
  } = useCrypto();

  const { favorites, toggleFavorite, isFavorite } =
    useFavorites();

  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  // controls page view (market / volume / default)
  const [view, setView] = useState("default");

  const debouncedSearch = useDebounce(search, 300);

  // filter coins (search + favorites)
  const filteredCoins = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    let list = coins;

    if (showFavorites)
      list = list.filter((c) => favorites.includes(c.id));

    if (!query) return list;

    return list.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
    );
  }, [coins, debouncedSearch, showFavorites, favorites]);

  const showError = error && !coins.length;

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">

        {/* header */}
        <div className="sticky-top">
          <GlobalBar global={global} />
          <Header
            search={search}
            onSearch={setSearch}
            theme={theme}
            onToggleTheme={toggleTheme}
            onRefresh={refresh}
            refreshing={refreshing}
            lastUpdated={lastUpdated}
            showFavorites={showFavorites}
            onToggleFavorites={() =>
              setShowFavorites((v) => !v)
            }
            favoritesCount={favorites.length}
          />
        </div>

        {showError ? (
          <ErrorState message={error} onRetry={refresh} />
        ) : (
          <>
            {/* Top cards (gainer/loser click works here) */}
            <TopCards
              stats={stats}
              onSelect={setSelectedCoin}
              onNavigate={setView}
            />

            {/* DEFAULT VIEW */}
            {view === "default" && (
              <>
                <div className="two-col">

                  {/* IMPORTANT: pass coins for full data mapping */}
                  <TrendingCoins
                    trending={trending}
                    coins={coins}
                    onSelect={setSelectedCoin}
                  />

                  <MoversSection
                    coins={coins}
                    onSelect={setSelectedCoin}
                  />
                </div>

                <CoinTable
                  coins={filteredCoins}
                  loading={loading}
                  onSelect={setSelectedCoin}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              </>
            )}

            {/* MARKET VIEW */}
            {view === "market" && (
              <>
                <button
                  className="back-btn"
                  onClick={() => setView("default")}
                >
                  <ArrowLeft size={20} />
                </button>

                <CoinTable
                  coins={coins}
                  loading={loading}
                  onSelect={setSelectedCoin}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              </>
            )}

            {/* VOLUME VIEW */}
            {view === "volume" && (
              <>
                <button
                  className="back-btn"
                  onClick={() => setView("default")}
                >
                  <ArrowLeft size={20} />
                </button>

                <div className="volume-view">
                  <h2>Top Volume Coins</h2>

                  <div className="volume-grid">
                    {coins.slice(0, 10).map((coin) => (
                      <div
                        key={coin.id}
                        className="volume-card"
                        onClick={() => setSelectedCoin(coin)}
                      >
                        <img src={coin.image} width="30" />
                        <div>
                          <strong>{coin.name}</strong>
                          <p>₹ {coin.total_volume.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Drawer opens when selectedCoin is set */}
      <CoinDrawer
        coin={selectedCoin}
        onClose={() => setSelectedCoin(null)}
      />
    </main>
  );
}