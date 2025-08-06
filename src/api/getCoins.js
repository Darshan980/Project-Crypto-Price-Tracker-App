import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getTopCoins = async (limit = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    throw error;
  }
};

export const getCoinHistory = async (coinId, days = 7) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching coin history:', error);
    throw error;
  }
};

export const searchCoins = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search?query=${query}`
    );
    return response.data.coins;
  } catch (error) {
    console.error('Error searching coins:', error);
    throw error;
  }
};