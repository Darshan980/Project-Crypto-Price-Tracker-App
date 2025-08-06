import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getCoinHistory } from '../api/getCoins.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartView = ({ coin, days, isDark }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!coin) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await getCoinHistory(coin.id, days);
        
        const prices = data.prices.map(price => ({
          x: new Date(price[0]).toLocaleDateString(),
          y: price[1]
        }));

        setChartData({
          labels: prices.map(price => price.x),
          datasets: [
            {
              label: `${coin.name} Price (USD)`,
              data: prices.map(price => price.y),
              borderColor: coin.price_change_percentage_24h >= 0 ? '#38a169' : '#e53e3e',
              backgroundColor: coin.price_change_percentage_24h >= 0 
                ? 'rgba(72, 187, 120, 0.1)' 
                : 'rgba(245, 101, 101, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (err) {
        setError('Failed to load chart data');
        console.error('Chart data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [coin, days]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#f7fafc' : '#1a202c',
        },
      },
      title: {
        display: true,
        text: `${coin?.name} Price Chart (${days} days)`,
        color: isDark ? '#f7fafc' : '#1a202c',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `Price: $${context.parsed.y.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          color: isDark ? '#f7fafc' : '#1a202c',
        },
        ticks: {
          color: isDark ? '#f7fafc' : '#1a202c',
          maxTicksLimit: 7,
        },
        grid: {
          color: isDark ? '#4a5568' : '#e2e8f0',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price (USD)',
          color: isDark ? '#f7fafc' : '#1a202c',
        },
        ticks: {
          color: isDark ? '#f7fafc' : '#1a202c',
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        },
        grid: {
          color: isDark ? '#4a5568' : '#e2e8f0',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  if (!coin) return null;

  return (
    <div className="chart-container">
      <div className="chart-title">
        {coin.name} ({coin.symbol.toUpperCase()}) - {days} Day Price History
      </div>
      
      {loading && <div className="loading">Loading chart...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {chartData && !loading && !error && (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default ChartView;