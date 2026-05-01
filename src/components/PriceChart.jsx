import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../utils/format";

// Component to display 7-day price chart for a coin
export default function PriceChart({ coin }) {
  // Extract price data safely (fallback to empty array if missing)
  const prices = coin?.sparkline_in_7d?.price || [];

  // Transform raw price array into chart-friendly format
  const chartData = prices.map((price, index) => ({
    // Create pseudo time labels (Day 0 → Day 7)
    time: `Day ${(
      (index / Math.max(prices.length - 1, 1)) * 7
    ).toFixed(1)}`,
    price,
  }));

  // Determine if trend is positive (for color styling)
  const positive =
    (coin?.price_change_percentage_24h || 0) >= 0;

  // Dynamic line color (green for up, red for down)
  const stroke = positive ? "#16c784" : "#ea3943";

  return (
    <div
      className="price-chart"
      aria-label={`${coin?.name || "Coin"} seven day chart`}
    >
      {/* Responsive container ensures chart scales with parent */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 12, right: 4, left: 0, bottom: 0 }}
        >
          {/* Gradient definitions for area fill */}
          <defs>
            {/* Green gradient for upward trend */}
            <linearGradient id="chartFillUp" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="#16c784"
                stopOpacity="0.45"
              />
              <stop
                offset="100%"
                stopColor="#16c784"
                stopOpacity="0"
              />
            </linearGradient>

            {/* Red gradient for downward trend */}
            <linearGradient id="chartFillDown" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="#ea3943"
                stopOpacity="0.45"
              />
              <stop
                offset="100%"
                stopColor="#ea3943"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Hide axes (minimal UI design) */}
          <XAxis dataKey="time" hide />
          <YAxis hide domain={["dataMin", "dataMax"]} />

          {/* Tooltip for hover interaction */}
          <Tooltip
            formatter={(value) => [
              // Format price dynamically
              formatCurrency(value, value < 1 ? 6 : 2),
              "Price",
            ]}
            labelFormatter={() => "7D"} // Fixed label
            contentStyle={{
              background: "var(--cg-surface)",
              border: "1px solid var(--cg-border)",
              borderRadius: "10px",
              color: "var(--cg-fg)",
              fontSize: "0.82rem",
              boxShadow: "var(--cg-shadow)",
            }}
          />

          {/* Area chart line + fill */}
          <Area
            type="monotone" // Smooth curve
            dataKey="price"
            stroke={stroke} // Dynamic color
            strokeWidth={2.5}
            fill={
              positive
                ? "url(#chartFillUp)"
                : "url(#chartFillDown)"
            }
            isAnimationActive // Enable animation
            animationDuration={900} // Animation speed (ms)
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}