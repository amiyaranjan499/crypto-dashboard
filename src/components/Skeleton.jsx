// Skeleton loader for table while data is fetching
export default function Skeleton() {
  return (
    // Wrapper section with accessibility label
    <section
      className="table-shell"
      aria-label="Loading market data"
    >
      {/* Header skeleton (structure matches actual table header) */}
      <div className="table-header skeleton-header">
        {/* Empty spans act as placeholders */}
        <span /> {/* Favorite column */}
        <span>#</span>
        <span>Coin</span>
        <span className="th-right">Price</span>
        <span className="th-right">24h %</span>
        <span className="th-right hide-mobile">
          Market Cap
        </span>
        <span className="th-right hide-tablet">
          Volume
        </span>
        <span className="th-right">Last 7 Days</span>
      </div>

      {/* Body skeleton rows */}
      <div className="table-body">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            className="skeleton-row"
            key={index} // Unique key for each row
          >
            {/* Each span represents a cell placeholder */}
            <span /> {/* Favorite */}
            <span /> {/* Rank */}
            <span /> {/* Coin */}
            <span /> {/* Price */}
            <span /> {/* Change */}
            <span className="hide-mobile" /> {/* Market cap */}
            <span className="hide-tablet" /> {/* Volume */}
            <span /> {/* Chart */}
          </div>
        ))}
      </div>
    </section>
  );
}