import { Flame } from "lucide-react";

export default function TrendingCoins({ trending, coins, onSelect }) {
  // hide if no data
  if (!trending?.length) return null;

  return (
    <section className="trending-widget">
      <div className="trending-head">
        <Flame size={18} />
        <h2>Trending Now</h2>
      </div>

      <div className="trending-list">
        {trending.map((coin) => {
          // fix: handle both API structures
          const c = coin.item || coin;

          if (!c?.id) return null;

          return (
            <div
              key={c.id}
              className="trending-pill"
              onClick={() => {
                // match with full coin data
                const fullCoin = coins?.find(
                  (x) => x.id === c.id
                );

                onSelect?.(fullCoin || c);
              }}
              style={{ cursor: "pointer" }}
            >
              <img
                src={c.small || c.thumb}
                alt={c.name}
              />

              <div>
                <strong>{c.name}</strong>
                <small>
                  {c.symbol?.toUpperCase()} · #
                  {c.market_cap_rank || "—"}
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}