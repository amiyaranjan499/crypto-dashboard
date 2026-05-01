import { Activity, BarChart3, Bitcoin, Globe2, Hexagon } from "lucide-react";
import { formatCurrency, formatPercent } from "../utils/format";

// Reusable item component for each global metric
function Item({ icon: Icon, label, value }) {
  return (
    <div className="global-item">
      {/* Icon for visual representation */}
      <span className="global-icon">
        <Icon size={14} />
      </span>

      {/* Label (e.g., Market Cap, Volume) */}
      <span>{label}</span>

      {/* Value (formatted data) */}
      <strong>{value}</strong>
    </div>
  );
}

// Main component to display global crypto statistics
export default function GlobalBar({ global }) {
  // If no data available, don't render anything
  if (!global) return null;

  // Extract required values safely using optional chaining
  const marketCap = global.total_market_cap?.usd;
  const volume = global.total_volume?.usd;
  const btc = global.market_cap_percentage?.btc;
  const eth = global.market_cap_percentage?.eth;
  const change = global.market_cap_change_percentage_24h_usd;

  return (
    <div className="global-bar" aria-label="Global market stats">
      {/* Total market capitalization */}
      <Item
        icon={Globe2}
        label="Market Cap"
        value={formatCurrency(marketCap, 2)}
      />

      {/* 24h market change (separate styling for positive/negative) */}
      <div className="global-item">
        <span>24h:</span>
        <strong
          className={change >= 0 ? "text-profit" : "text-loss"} // Dynamic color
        >
          {formatPercent(change)}
        </strong>
      </div>

      {/* Total 24h trading volume */}
      <Item
        icon={BarChart3}
        label="24h Vol"
        value={formatCurrency(volume, 2)}
      />

      {/* Bitcoin dominance */}
      <Item
        icon={Bitcoin}
        label="BTC Dom"
        value={`${btc?.toFixed(1)}%`} // Safe formatting
      />

      {/* Ethereum dominance */}
      <Item
        icon={Hexagon}
        label="ETH Dom"
        value={`${eth?.toFixed(1)}%`}
      />

      {/* Total number of active cryptocurrencies */}
      <Item
        icon={Activity}
        label="Coins"
        value={
          global.active_cryptocurrencies?.toLocaleString() || "—" // Fallback if missing
        }
      />
    </div>
  );
}