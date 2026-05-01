// Sparkline chart component (lightweight SVG-based mini chart)
export default function Sparkline({
  data = [],
  positive = true,
  large = false,
}) {
  // Filter only valid numeric values (avoid NaN/undefined issues)
  const values = data.filter((value) =>
    Number.isFinite(value)
  );

  // Set chart size based on mode (small / large)
  const width = large ? 720 : 160;
  const height = large ? 260 : 52;

  // If not enough data points, show empty placeholder
  if (values.length < 2) {
    return (
      <div
        className={
          large
            ? "sparkline-empty sparkline-large"
            : "sparkline-empty"
        }
      />
    );
  }

  // Calculate min & max values for scaling
  const min = Math.min(...values);
  const max = Math.max(...values);

  // Prevent division by zero (if all values are same)
  const range = max - min || 1;

  // Convert data into SVG coordinate points
  const points = values
    .map((value, index) => {
      // X position spreads evenly across width
      const x =
        (index / (values.length - 1)) * width;

      // Y position is inverted (SVG origin is top-left)
      const y =
        height -
        ((value - min) / range) * height;

      // Return formatted coordinate pair
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" "); // Combine into single string for polyline

  return (
    <svg
      className={
        large
          ? "sparkline sparkline-large"
          : "sparkline"
      }
      viewBox={`0 0 ${width} ${height}`} // Defines coordinate system
      preserveAspectRatio="none" // Stretch to fit container
      role="img"
      aria-label="7-day price sparkline"
    >
      {/* Line path */}
      <polyline
        points={points} // Computed coordinates
        fill="none" // No fill, just line
        stroke={positive ? "#22c55e" : "#ef4444"} // Green/Red color
        strokeWidth={large ? 4 : 2.5} // Thickness based on size
        strokeLinecap="round" // Smooth line edges
        strokeLinejoin="round"
      />
    </svg>
  );
}