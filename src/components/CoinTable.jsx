import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Sort direction icons
import CoinRow from "./CoinRow"; // Row component
import Skeleton from "./Skeleton"; // Loading UI

// Number of items per page
const PAGE_SIZE = 15;

// Sorting functions for different columns
const SORT_KEYS = {
  rank: (c) => c.market_cap_rank ?? Infinity, // Default large value if missing
  price: (c) => c.current_price ?? 0,
  change: (c) => c.price_change_percentage_24h ?? 0,
  market_cap: (c) => c.market_cap ?? 0,
  volume: (c) => c.total_volume ?? 0,
};

// Header component for sortable columns
function SortHeader({ label, k, sort, setSort, align = "left" }) {
  const active = sort.key === k; // Check if this column is active
  const Icon = active && sort.dir === "asc" ? ChevronUp : ChevronDown;

  // Dynamic class for styling
  const cls = `sortable${active ? " active" : ""}${
    align === "right" ? " th-right" : ""
  }`;

  // Handle sorting toggle
  const onClick = () => {
    setSort((s) =>
      s.key === k
        ? { key: k, dir: s.dir === "asc" ? "desc" : "asc" } // Toggle direction
        : { key: k, dir: "desc" } // Default sort direction
    );
  };

  return (
    <span
      className={cls}
      onClick={onClick}
      role="button"
      tabIndex={0}
      // Keyboard accessibility
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && onClick()
      }
    >
      {label}
      {/* Show sort direction icon */}
      <Icon size={12} style={{ opacity: active ? 1 : 0.35 }} />
    </span>
  );
}

// Main table component
export default function CoinTable({
  coins,
  loading,
  onSelect,
  isFavorite,
  onToggleFavorite,
}) {
  const [sort, setSort] = useState({ key: "rank", dir: "asc" }); // Sort state
  const [page, setPage] = useState(1); // Current page

  // Memoized sorting to avoid recalculation on every render
  const sorted = useMemo(() => {
    const fn = SORT_KEYS[sort.key] || SORT_KEYS.rank;

    const list = [...coins].sort((a, b) => {
      const av = fn(a);
      const bv = fn(b);

      return sort.dir === "asc" ? av - bv : bv - av;
    });

    return list;
  }, [coins, sort]);

  // Calculate total pages
  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / PAGE_SIZE)
  );

  // Ensure current page is within bounds
  const safePage = Math.min(page, totalPages);

  // Get only items for current page
  const pageCoins = useMemo(
    () =>
      sorted.slice(
        (safePage - 1) * PAGE_SIZE,
        safePage * PAGE_SIZE
      ),
    [sorted, safePage]
  );

  // Show skeleton loader while fetching data
  if (loading) return <Skeleton />;

  return (
    <section
      className="table-shell"
      aria-label="Top 50 cryptocurrency market table"
    >
      {/* Table header */}
      <div className="table-header">
        <span aria-label="Favorite"></span>

        <SortHeader
          label="#"
          k="rank"
          sort={sort}
          setSort={setSort}
        />

        <span>Coin</span>

        <SortHeader
          label="Price"
          k="price"
          sort={sort}
          setSort={setSort}
          align="right"
        />

        <SortHeader
          label="24h %"
          k="change"
          sort={sort}
          setSort={setSort}
          align="right"
        />

        {/* Hidden on mobile */}
        <span className="th-right hide-mobile">
          <SortHeader
            label="Market Cap"
            k="market_cap"
            sort={sort}
            setSort={setSort}
            align="right"
          />
        </span>

        {/* Hidden on tablet */}
        <span className="th-right hide-tablet">
          <SortHeader
            label="Volume"
            k="volume"
            sort={sort}
            setSort={setSort}
            align="right"
          />
        </span>

        <span className="th-right">Last 7 Days</span>
      </div>

      {/* Table body */}
      <div className="table-body">
        {pageCoins.length ? (
          pageCoins.map((coin) => (
            <CoinRow
              key={coin.id} // Important for React rendering
              coin={coin}
              onSelect={onSelect}
              isFavorite={isFavorite?.(coin.id)} // Check favorite status
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          // Empty state UI
          <div className="empty-state">
            <strong>No results found</strong>
            <p>Try a different name or symbol.</p>
          </div>
        )}
      </div>

      {/* Pagination section */}
      {sorted.length > PAGE_SIZE && (
        <div className="pagination">
          {/* Showing range info */}
          <span>
            Showing {(safePage - 1) * PAGE_SIZE + 1}–
            {Math.min(safePage * PAGE_SIZE, sorted.length)} of{" "}
            {sorted.length}
          </span>

          {/* Page buttons */}
          <div className="pages">
            {/* Previous button */}
            <button
              className="page-btn"
              disabled={safePage === 1}
              onClick={() => setPage(safePage - 1)}
            >
              Prev
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`page-btn${
                  safePage === i + 1 ? " active" : ""
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            {/* Next button */}
            <button
              className="page-btn"
              disabled={safePage === totalPages}
              onClick={() => setPage(safePage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}