import { memo } from "react";
import { ArrowDown, ArrowUp, Star } from "lucide-react"; // Icons
import Sparkline from "./Sparkline"; // Mini chart component
import { formatCurrency, formatNumber, formatPercent } from "../utils/format"; // Format helpers

// Component to render a single coin row in the list/table
function CoinRow({ coin, onSelect, isFavorite, onToggleFavorite }) {
  const change = coin.price_change_percentage_24h || 0; // 24h price change
  const positive = change >= 0; // Check if price increased

  // Handle favorite button click (prevent triggering row click)
  const handleFav = (e) => {
    e.stopPropagation(); // Prevent parent click (row selection)
    onToggleFavorite?.(coin.id); // Toggle favorite status
  };

  return (
    <div
      className="coin-row"
      role="button" // Accessibility: behaves like a button
      tabIndex={0} // Makes div focusable
      onClick={() => onSelect(coin)} // Select coin on click
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && onSelect(coin) // Keyboard support
      }
    >
      {/* Favorite toggle button */}
      <button
        className={`fav-btn${isFavorite ? " active" : ""}`}
        type="button"
        onClick={handleFav}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {/* Fill star if favorite */}
        <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      {/* Coin rank */}
      <span className="rank">#{coin.market_cap_rank}</span>

      {/* Coin image + name + symbol */}
      <span className="coin-cell">
        <img
          src={coin.image}
          alt={`${coin.name} logo`}
          loading="lazy" // Lazy loading improves performance
        />
        <span>
          <strong>{coin.name}</strong>
          <small>{coin.symbol.toUpperCase()}</small>
        </span>
      </span>

      {/* Current price */}
      <span className="numeric">
        {formatCurrency(
          coin.current_price,
          coin.current_price < 1 ? 6 : 2 // More precision for small values
        )}
      </span>

      {/* Price change with icon */}
      <span className={positive ? "change-up" : "change-down"}>
        {positive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
        {formatPercent(change)}
      </span>

      {/* Market cap (hidden on small screens) */}
      <span className="numeric hide-mobile">
        {formatCurrency(coin.market_cap, 2)}
      </span>

      {/* Volume (hidden on tablet) */}
      <span className="numeric hide-tablet">
        {formatNumber(coin.total_volume)}
      </span>

      {/* 7-day sparkline chart */}
      <span className="spark-cell hide-mobile">
        <Sparkline
          data={coin.sparkline_in_7d?.price} // Optional chaining for safety
          positive={positive} // Pass trend direction
        />
      </span>
    </div>
  );
}

// memo() prevents unnecessary re-renders if props don’t change
export default memo(CoinRow);