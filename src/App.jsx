import React, { useState, useEffect } from 'react';
import { getTopCoins } from './api/getCoins.js';
import CryptoCard from './components/CryptoCard.jsx';
import DarkModeToggle from './components/DarkModeToggle.jsx';
import ChartView from './components/ChartView.jsx';
import './styles/app.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [chartDays, setChartDays] = useState(7);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('crypto-tracker-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.body.className = isDark ? 'dark' : 'light';
    localStorage.setItem('crypto-tracker-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Fetch coins data
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTopCoins(20); // Get top 20 coins
        setCoins(data);
        setFilteredCoins(data);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data. Please try again later.');
        console.error('Error fetching coins:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();

    // Set up auto-refresh every 60 seconds
    const interval = setInterval(fetchCoins, 60000);
    return () => clearInterval(interval);
  }, []);

  // Filter coins based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCoins(coins);
    } else {
      const filtered = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCoins(filtered);
    }
  }, [searchTerm, coins]);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChartDaysChange = (e) => {
    setChartDays(parseInt(e.target.value));
  };

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            📈 Crypto Price Tracker
          </div>
          
          <div className="controls">
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            
            <select
              value={chartDays}
              onChange={handleChartDaysChange}
              className="time-selector"
            >
              <option value={1}>1 Day</option>
              <option value={7}>7 Days</option>
              <option value={30}>30 Days</option>
              <option value={90}>90 Days</option>
            </select>
            
            <DarkModeToggle isDark={isDark} onToggle={handleThemeToggle} />
          </div>
        </div>
      </header>

      <main className="main-content">
        {loading && <div className="loading">Loading cryptocurrency data...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && (
          <>
            <div className="crypto-grid">
              {filteredCoins.map((coin) => (
                <CryptoCard
                  key={coin.id}
                  coin={coin}
                  onClick={handleCoinClick}
                />
              ))}
            </div>
            
            {filteredCoins.length === 0 && searchTerm && (
              <div className="error">
                No cryptocurrencies found matching "{searchTerm}"
              </div>
            )}
          </>
        )}
        
        {selectedCoin && (
          <ChartView
            coin={selectedCoin}
            days={chartDays}
            isDark={isDark}
          />
        )}
      </main>
    </div>
  );
}

export default App;