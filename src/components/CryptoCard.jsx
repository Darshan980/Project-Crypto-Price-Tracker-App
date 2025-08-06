import React from 'react';

const CryptoCard = ({ coin, onClick }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  };

  const formatPercentage = (percentage) => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };

  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="crypto-card" onClick={() => onClick(coin)}>
      <div className="crypto-header">
        <img
          src={coin.image}
          alt={coin.name}
          className="crypto-image"
        />
        <div className="crypto-info">
          <h3>{coin.name}</h3>
          <div className="crypto-symbol">{coin.symbol}</div>
        </div>
      </div>
      
      <div className="crypto-price">
        {formatPrice(coin.current_price)}
      </div>
      
      <div className={`crypto-change ${isPositive ? 'positive' : 'negative'}`}>
        {formatPercentage(coin.price_change_percentage_24h)}
      </div>
      
      <div className="crypto-market-cap">
        Market Cap: {formatMarketCap(coin.market_cap)}
      </div>
    </div>
  );
};

export default CryptoCard;