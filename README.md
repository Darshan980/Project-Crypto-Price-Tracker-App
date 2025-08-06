# 📈 Crypto Price Tracker App

A real-time cryptocurrency price tracking application built with React.js that displays live market data, price charts, and supports dark mode.

## 🚀 Features

### ✅ Core Features
- 🔁 **Real-time data** from CoinGecko API
- 💰 **Top 20 cryptocurrencies** with live prices
- 📉 **24h Price Change** percentage with color coding
- 🌓 **Dark Mode Toggle** with persistent theme
- 📱 **Responsive design** for all devices

### 🎁 Bonus Features
- 📊 **Interactive Price Charts** with Chart.js
- 🔎 **Search functionality** to filter cryptocurrencies
- 📅 **Time interval selection** (1d, 7d, 30d, 90d)
- 🔄 **Auto-refresh** every 60 seconds
- 💾 **Theme persistence** using localStorage

## 🛠️ Tech Stack

- **React.js** - Component-based UI framework
- **Axios** - HTTP client for API requests
- **Chart.js & React-ChartJS-2** - Interactive charts
- **CoinGecko API** - Cryptocurrency data source
- **CSS3** - Custom styling with dark mode support

## 📦 Installation

1. **Clone or download** this project
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm start
   ```
4. **Open your browser** and navigate to `http://localhost:4000`

## 🔗 API Reference

This app uses the free CoinGecko API:

- **Market Data**: `https://api.coingecko.com/api/v3/coins/markets`
- **Price History**: `https://api.coingecko.com/api/v3/coins/{id}/market_chart`

No API key required!

## 📁 Project Structure

```
crypto-tracker/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── getCoins.js          # API service functions
│   ├── components/
│   │   ├── CryptoCard.jsx       # Individual crypto card
│   │   ├── DarkModeToggle.jsx   # Theme toggle button
│   │   └── ChartView.jsx        # Price chart component
│   ├── styles/
│   │   └── app.css              # Main stylesheet
│   ├── App.jsx                  # Main app component
│   └── index.js                 # React entry point
├── package.json
└── README.md
```

## 🎯 How It Works

1. **Data Fetching**: Uses `useEffect` to fetch cryptocurrency data on component mount
2. **State Management**: Uses `useState` to manage:
   - Coin data and filtered results
   - Theme preference (light/dark)
   - Selected coin for chart display
   - Search term and loading states
3. **Real-time Updates**: Auto-refreshes data every 60 seconds
4. **Interactive Charts**: Click any crypto card to view its price history
5. **Search & Filter**: Real-time search through coin names and symbols

## 🎨 Features Breakdown

### Cryptocurrency Cards
- Display coin logo, name, and symbol
- Current price with proper formatting
- 24h price change with color coding (green/red)
- Market capitalization
- Click to view price chart

### Price Charts
- Interactive line charts using Chart.js
- Configurable time periods (1d, 7d, 30d, 90d)
- Responsive design with theme-aware colors
- Hover tooltips with detailed price information

### Dark Mode
- Toggle between light and dark themes
- Persistent theme preference in localStorage
- Smooth transitions between themes
- Theme-aware chart colors

### Search & Filtering
- Real-time search through cryptocurrency names and symbols
- Case-insensitive matching
- Instant results as you type

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The build folder will contain optimized files ready for deployment to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## 🔧 Customization

### Adding More Coins
Change the limit in `src/App.jsx`:
```javascript
const data = await getTopCoins(50); // Show top 50 instead of 20
```

### Modifying Refresh Rate
Update the interval in `src/App.jsx`:
```javascript
const interval = setInterval(fetchCoins, 30000); // Refresh every 30 seconds
```

### Styling
Customize colors and layout in `src/styles/app.css`

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

