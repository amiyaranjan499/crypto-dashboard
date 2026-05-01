import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
} from "lucide-react";
import { formatCurrency, formatPercent } from "../utils/format";

// Reusable stat card
function StatCard({ icon: Icon, label, value, meta, tone = "neutral", onClick }) {
  return (
    <article
      className={`stat-card tone-${tone}`} // tone-based styling
      onClick={onClick} // optional click
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="stat-icon">
        <Icon size={20} />
      </div>

      <div>
        <p>{label}</p>

        {/* value color based on tone */}
        <strong
          className={
            tone === "up"
              ? "text-profit"
              : tone === "down"
              ? "text-loss"
              : ""
          }
        >
          {value}
        </strong>

        {meta && <span>{meta}</span>}
      </div>
    </article>
  );
}

// Top summary cards
export default function TopCards({ stats, onSelect, onNavigate }) {
  return (
    <section className="top-cards">

      {/* navigate to market */}
      <StatCard
        icon={CircleDollarSign}
        label="Total Market Cap"
        value={formatCurrency(stats.totalMarketCap, 2)}
        meta="Top 50 coins"
        onClick={() => onNavigate?.("market")}
      />

      {/* navigate to volume */}
      <StatCard
        icon={Activity}
        label="24h Volume"
        value={formatCurrency(stats.totalVolume, 2)}
        meta="Rolling market flow"
        onClick={() => onNavigate?.("volume")}
      />

      {/* open top gainer */}
      <StatCard
        icon={ArrowUpRight}
        label="Top Gainer"
        value={stats.topGainer?.symbol?.toUpperCase() || "—"}
        meta={
          stats.topGainer
            ? formatPercent(stats.topGainer.price_change_percentage_24h)
            : "—"
        }
        tone="up"
        onClick={() => onSelect?.(stats.topGainer)}
      />

      {/* open top loser */}
      <StatCard
        icon={ArrowDownRight}
        label="Top Loser"
        value={stats.topLoser?.symbol?.toUpperCase() || "—"}
        meta={
          stats.topLoser
            ? formatPercent(stats.topLoser.price_change_percentage_24h)
            : "—"
        }
        tone="down"
        onClick={() => onSelect?.(stats.topLoser)}
      />
    </section>
  );
}