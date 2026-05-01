import { memo } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react"; // Trend icons
import { formatCurrency, formatPercent } from "../utils/format"; // Format helpers

// Component to render either Top Gainers or Top Losers list
function MoverList({ title, coins, tone, onSelect }) {
  // Choose icon based on tone (up/down)
  const Icon = tone === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <article className={`movers-card glow-${tone}`}>
      {/* Header section */}
      <div className="movers-head">
        {/* Icon with color styling */}
        <span className={`movers-icon movers-icon-${tone}`}>
          <Icon size={16} />
        </span>

        {/* Title (Top Gainers / Top Losers) */}
        <h2
        className="cursor-pointer"
        onClick={() => onSelect?.(coins?.[0])}
        >
         {title}
        </h2>
      </div>

      {/* List of coins */}
      <ul className="movers-list">
        {coins.map((coin) => (
          <li key={coin.id}>
            {/* Entire row is clickable */}
            <button
              type="button"
              className="movers-row"
              onClick={() => onSelect?.(coin)} // Select coin
            >
              {/* Coin logo */}
              <img src={coin.image} alt={`${coin.name} logo`} loading="lazy" />

              {/* Coin name + symbol */}
              <span className="movers-name">
                <strong>{coin.name}</strong>
                <small>{coin.symbol.toUpperCase()}</small>
              </span>

              {/* Current price */}
              <span className="movers-price">
                {formatCurrency(
                  coin.current_price,
                  coin.current_price < 1 ? 6 : 2 // Precision for small values
                )}
              </span>

              {/* Percentage change badge */}
              <span
                className={`movers-badge movers-badge-${tone}`}
              >
                {/* Arrow direction */}
                {tone === "up" ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}

                {/* 24h change */}
                {formatPercent(
                  coin.price_change_percentage_24h
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}

// Main section to compute and display top movers
function MoversSection({ coins, onSelect }) {
  // If no data, don't render
  if (!coins?.length) return null;

  // Filter out invalid change values (avoid NaN issues)
  const sorted = [...coins].filter((c) =>
    Number.isFinite(c.price_change_percentage_24h)
  );

  // Top 5 gainers (highest % change)
  const gainers = [...sorted]
    .sort(
      (a, b) =>
        b.price_change_percentage_24h -
        a.price_change_percentage_24h
    )
    .slice(0, 5);

  // Top 5 losers (lowest % change)
  const losers = [...sorted]
    .sort(
      (a, b) =>
        a.price_change_percentage_24h -
        b.price_change_percentage_24h
    )
    .slice(0, 5);

  return (
    <section
      className="movers-grid"
      aria-label="Top movers"
    >
      {/* Top Gainers */}
      <MoverList
        title="Top Gainers (24h)"
        coins={gainers}
        tone="up"
        onSelect={onSelect}
      />

      {/* Top Losers */}
      <MoverList
        title="Top Losers (24h)"
        coins={losers}
        tone="down"
        onSelect={onSelect}
      />
    </section>
  );
}

// memo prevents unnecessary re-renders if props don't change
export default memo(MoversSection);