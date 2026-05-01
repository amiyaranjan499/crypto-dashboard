import { Bitcoin, Moon, RefreshCw, Star, Sun } from "lucide-react"; // Icons
import SearchBar from "./SearchBar"; // Search input component
import { formatTime } from "../utils/format"; // Time formatter

// Header component for the dashboard top section
export default function Header({
  search,
  onSearch,
  theme,
  onToggleTheme,
  onRefresh,
  refreshing,
  lastUpdated,
  showFavorites,
  onToggleFavorites,
  favoritesCount,
}) {
  return (
    <header className="dashboard-header">
      {/* Branding section */}
      <div className="brand-block">
        {/* Logo icon */}
        <div className="brand-logo" aria-hidden="true">
          <Bitcoin size={28} />
        </div>

        {/* Title and subtitle */}
        <div>
          <p className="eyebrow">Live CoinGecko markets</p>
          <h1>Crypto Market Dashboard</h1>

          {/* Last updated time */}
          <p className="header-subtitle">
            Updated at {formatTime(lastUpdated)}
          </p>
        </div>
      </div>

      {/* Action buttons section */}
      <div className="header-actions">
        {/* Search bar for filtering coins */}
        <SearchBar value={search} onChange={onSearch} />

        {/* Favorites toggle button */}
        <button
          className={`icon-button${showFavorites ? " active" : ""}`}
          type="button"
          onClick={onToggleFavorites}
          aria-label="Toggle favorites filter"
          title={`Favorites (${favoritesCount})`} // Tooltip
        >
          {/* Fill star when active */}
          <Star size={20} fill={showFavorites ? "currentColor" : "none"} />
        </button>

        {/* Theme toggle (dark/light mode) */}
        <button
          className="icon-button"
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {/* Show opposite icon based on current theme */}
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Refresh data button */}
        <button
          className="icon-button"
          type="button"
          onClick={onRefresh}
          aria-label="Refresh market data"
          disabled={refreshing} // Disable while loading
        >
          {/* Add spinning animation while refreshing */}
          <RefreshCw
            size={20}
            className={refreshing ? "spin" : ""}
          />
        </button>
      </div>
    </header>
  );
}