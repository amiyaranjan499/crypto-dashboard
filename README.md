🚀 Crypto Market Dashboard

A modern, responsive Crypto Market Dashboard built with React (JSX), Vite, and Tailwind CSS, powered by live data from the CoinGecko API.

This dashboard provides real-time insights into cryptocurrency markets with a clean fintech-style UI.

---

🌐 Live Demo

👉 

---

✨ Features

- 📊 Live top 50 cryptocurrencies (CoinGecko API)
- 📈 Market overview bar (Market Cap, Volume, BTC/ETH dominance)
- 🔍 Search by coin name or symbol
- 🌙 Dark / Light mode toggle
- 🔄 Auto refresh every 60 seconds
- 🔁 Manual refresh button
- 🟢 Live update timestamp
- 📉 7-day sparkline charts
- 🏆 Top Cards (Market Cap, Volume, Gainer, Loser)
- 🔥 Trending coins section
- 📊 Top Gainers & Losers list
- 📂 Coin detail drawer with charts & stats
- ⚡ Skeleton loading state
- ❌ API error handling
- 📱 Fully responsive design

---

🛠 Tech Stack

- React (JSX)
- Vite
- Tailwind CSS
- CoinGecko API
- Recharts
- Lucide React Icons

---

📦 Setup Instructions

1. Clone repository

git clone https://github.com/your-username/crypto-dashboard.git

2. Install dependencies

npm install

3. Run development server

npm run dev

4. Open in browser

http://localhost:5173/

---

🧠 Technical Decisions

- Used React functional components with hooks for clean and scalable architecture
- Created custom hooks (useCrypto, useTheme) to separate logic from UI
- Implemented useMemo to optimize filtering and calculations
- Handled API calls using async/await with try-catch for robust error handling
- Added loading skeletons to improve user experience
- Implemented auto-refresh (polling) for real-time data updates
- Built reusable components for better maintainability and scalability

---

📁 Folder Structure

crypto-dashboard/
├── public/
│   └── favicon.ico

├── src/
│   ├── components/
│   │   ├── CoinDrawer.jsx        # Drawer panel for coin details
│   │   ├── CoinRow.jsx           # Single coin row in table
│   │   ├── CoinTable.jsx         # Main table of coins
│   │   ├── ErrorState.jsx        # Error UI (API failure)
│   │   ├── GlobalBar.jsx         # Market overview (cap, volume, dominance)
│   │   ├── Header.jsx            # Top header (title, search, theme toggle)
│   │   ├── MoversSection.jsx     # Top gainers & losers section
│   │   ├── PriceChart.jsx        # Detailed chart in drawer
│   │   ├── SearchBar.jsx         # Search input component
│   │   ├── Skeleton.jsx          # Loading skeleton UI
│   │   ├── Sparkline.jsx         # Mini 7-day chart
│   │   ├── TopCards.jsx          # Dashboard summary cards
│   │   ├── TrendingCoins.jsx     # Trending coins section
│
│   ├── hooks/
│   │   ├── useCrypto.js          # Fetch + manage crypto data
│   │   ├── useDebounce.js        # Debounce search input
│   │   ├── useFavorites.js       # (Optional) favorite coins logic
│   │   ├── useTheme.js           # Dark/Light theme toggle
│
│   ├── services/
│   │   ├── api.js                # API calls (CoinGecko)
│
│   ├── utils/
│   │   ├── format.js             # Currency, percent, number formatting
│
│   ├── routes/
│   │   ├── index.jsx             # Route setup (if used)
│
│   ├── App.jsx                   # Main app layout
│   ├── main.jsx                  # React entry point
│   ├── App.css                   # Component styles
│   ├── index.css                 # Global styles (Tailwind)
│
├── index.html                    # Root HTML file
├── package.json                  # Dependencies & scripts
├── package-lock.json             # Lock file
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind setup
├── postcss.config.js             # PostCSS config
├── .gitignore                    # Ignored files
├── README.md                     # Project documentation

---

🌐 API Used

CoinGecko Markets API
https://api.coingecko.com/api/v3/coins/markets

---

🚀 Deployment

- Hosted on Vercel
- Build command: npm run build
- Output directory: dist

---

⚠️ Notes

- CoinGecko API has rate limits
- Data auto-refreshes every 60 seconds
- UI remains stable even if API fails

---

👨‍💻 Author

Amiyaranjan Behera