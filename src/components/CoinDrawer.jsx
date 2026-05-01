// Import required hooks and components
import { useEffect } from "react";
import { X } from "lucide-react"; // Close icon
import PriceChart from "./PriceChart"; // Chart component
import { formatCurrency, formatNumber, formatPercent } from "../utils/format"; // Utility functions

// Reusable component to display a label-value pair
function Metric({ label, value }) {
  return (
    <div className="drawer-metric">
      <span>{label}</span> {/* Metric label */}
      <strong>{value}</strong> {/* Metric value */}
    </div>
  );
}

// Main component for displaying coin details in a modal drawer
export default function CoinDrawer({ coin, onClose }) {
  const open = Boolean(coin); // Check if modal should be open (coin exists)
  const change = coin?.price_change_percentage_24h || 0; // Get 24h price change safely

  // Handle ESC key press to close modal
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.(); // Close when ESC is pressed
    };

    window.addEventListener("keydown", onKey);

    // Cleanup event listener when component unmounts or modal closes
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    // Modal overlay (background)
    <div
      className={open ? "modal-overlay open" : "modal-overlay"}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
    >
      {/* Click outside (backdrop) to close modal */}
      <button
        className="modal-backdrop"
        type="button"
        onClick={onClose}
        aria-label="Close"
      />

      {/* Main modal content */}
      <div className="coin-modal" aria-label="Coin details">
        {coin && (
          <>
            {/* Top section: Coin identity and close button */}
            <div className="drawer-top">
              <div className="drawer-identity">
                {/* Coin image */}
                <img src={coin.image} alt={`${coin.name} logo`} />

                {/* Coin name and rank */}
                <div>
                  <p>
                    {coin.symbol.toUpperCase()} · #{coin.market_cap_rank}
                  </p>
                  <h2>{coin.name}</h2>
                </div>
              </div>

              {/* Close button */}
              <button
                className="icon-button"
                type="button"
                onClick={onClose}
                aria-label="Close coin details"
              >
                <X size={20} />
              </button>
            </div>

            {/* Price section */}
            <div className="drawer-price">
              {/* Current price (dynamic decimal places for small values) */}
              <strong>
                {formatCurrency(
                  coin.current_price,
                  coin.current_price < 1 ? 6 : 2
                )}
              </strong>

              {/* Price change indicator */}
              <span className={change >= 0 ? "change-up" : "change-down"}>
                {formatPercent(change)}
              </span>
            </div>

            {/* Chart component showing price history */}
            <PriceChart coin={coin} />

            {/* Grid of additional metrics */}
            <div className="drawer-grid">
              <Metric
                label="Market cap"
                value={formatCurrency(coin.market_cap, 2)}
              />
              <Metric
                label="24h volume"
                value={formatCurrency(coin.total_volume, 2)}
              />
              <Metric
                label="24h high"
                value={formatCurrency(
                  coin.high_24h,
                  coin.high_24h < 1 ? 6 : 2
                )}
              />
              <Metric
                label="24h low"
                value={formatCurrency(
                  coin.low_24h,
                  coin.low_24h < 1 ? 6 : 2
                )}
              />
              <Metric
                label="Circulating supply"
                value={`${formatNumber(
                  coin.circulating_supply
                )} ${coin.symbol.toUpperCase()}`}
              />
              <Metric
                label="All-time high"
                value={formatCurrency(
                  coin.ath,
                  coin.ath < 1 ? 6 : 2
                )}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}