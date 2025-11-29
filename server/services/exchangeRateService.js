/**
 * Exchange Rates Service
 * Fetches real-time cryptocurrency and fiat exchange rates
 */

const axios = require('axios');

class ExchangeRateService {
  constructor() {
    this.coingeckoUrl = process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get exchange rate between two assets
   */
  async getExchangeRate(fromAsset, toAsset) {
    try {
      const cacheKey = `${fromAsset}-${toAsset}`;
      const cachedRate = this.getCached(cacheKey);

      if (cachedRate) {
        return cachedRate;
      }

      // Handle fiat to crypto or vice versa
      if (fromAsset === 'USD' || toAsset === 'USD') {
        return this.handleUSDRate(fromAsset, toAsset);
      }

      // Crypto to crypto rate
      const rate = await this.getCryptoRate(fromAsset, toAsset);
      this.setCached(cacheKey, rate);

      return rate;
    } catch (error) {
      console.error('Exchange rate error:', error.message);
      return null;
    }
  }

  /**
   * Get USD conversion rate
   */
  async handleUSDRate(fromAsset, toAsset) {
    try {
      const cryptoAsset = fromAsset === 'USD' ? toAsset : fromAsset;
      const prices = await this.getCryptoPrices([cryptoAsset]);

      if (!prices[cryptoAsset]) {
        return null;
      }

      const rate = prices[cryptoAsset].usd;
      return fromAsset === 'USD' ? 1 / rate : rate;
    } catch (error) {
      console.error('USD rate error:', error.message);
      return null;
    }
  }

  /**
   * Get crypto to crypto rate
   */
  async getCryptoRate(fromAsset, toAsset) {
    try {
      const prices = await this.getCryptoPrices([fromAsset, toAsset]);

      const fromPrice = prices[fromAsset]?.usd;
      const toPrice = prices[toAsset]?.usd;

      if (!fromPrice || !toPrice) {
        return null;
      }

      return fromPrice / toPrice;
    } catch (error) {
      console.error('Crypto rate error:', error.message);
      return null;
    }
  }

  /**
   * Get cryptocurrency prices from CoinGecko API
   */
  async getCryptoPrices(assets) {
    try {
      const ids = assets.map(a => this.mapAssetToId(a)).join(',');

      const response = await axios.get(`${this.coingeckoUrl}/simple/price`, {
        params: {
          ids,
          vs_currencies: 'usd',
          include_market_cap: 'true',
          include_24hr_vol: 'true',
          include_last_updated_at: 'true'
        },
        timeout: 10000
      });

      // Map response back to original asset names
      const prices = {};
      const responseKeys = Object.keys(response.data);

      assets.forEach((asset, index) => {
        const responseKey = responseKeys[index];
        if (responseKey && response.data[responseKey]) {
          prices[asset] = response.data[responseKey];
        }
      });

      return prices;
    } catch (error) {
      console.error('CoinGecko API error:', error.message);
      return {};
    }
  }

  /**
   * Get cryptocurrency details including market cap and 24hr change
   */
  async getCryptoDetails(assets) {
    try {
      const ids = assets.map(a => this.mapAssetToId(a)).join(',');

      const response = await axios.get(`${this.coingeckoUrl}/simple/price`, {
        params: {
          ids,
          vs_currencies: 'usd',
          include_market_cap: 'true',
          include_24hr_vol: 'true',
          include_24hr_change: 'true',
          include_last_updated_at: 'true'
        },
        timeout: 10000
      });

      const details = {};
      const responseKeys = Object.keys(response.data);

      assets.forEach((asset, index) => {
        const responseKey = responseKeys[index];
        if (responseKey && response.data[responseKey]) {
          details[asset] = {
            price: response.data[responseKey].usd,
            marketCap: response.data[responseKey].usd_market_cap,
            volume24h: response.data[responseKey].usd_24h_vol,
            change24h: response.data[responseKey].usd_24h_change,
            lastUpdated: response.data[responseKey].last_updated_at
          };
        }
      });

      return details;
    } catch (error) {
      console.error('Crypto details error:', error.message);
      return {};
    }
  }

  /**
   * Map asset symbol to CoinGecko ID
   */
  mapAssetToId(symbol) {
    const symbolMap = {
      BTC: 'bitcoin',
      ETH: 'ethereum',
      BNB: 'binancecoin',
      XRP: 'ripple',
      ADA: 'cardano',
      SOL: 'solana',
      DOT: 'polkadot',
      DOGE: 'dogecoin',
      AVAX: 'avalanche-2',
      MATIC: 'matic-network',
      LINK: 'chainlink',
      UNI: 'uniswap',
      USDT: 'tether',
      USDC: 'usd-coin',
      DAI: 'dai',
      BUSD: 'binance-usd'
    };

    return symbolMap[symbol.toUpperCase()] || symbol.toLowerCase();
  }

  /**
   * Cache management
   */
  getCached(key) {
    const cached = this.cache.get(key);

    if (!cached) {
      return null;
    }

    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return null;
    }

    return cached.value;
  }

  setCached(key, value) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + this.cacheExpiry
    });
  }

  clearCache() {
    this.cache.clear();
  }
}

module.exports = new ExchangeRateService();
