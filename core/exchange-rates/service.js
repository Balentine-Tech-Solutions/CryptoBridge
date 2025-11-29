// Exchange Rates Service
class ExchangeRatesService {
  constructor() {
    this.rates = new Map();
    this.lastUpdate = null;
  }

  /**
   * Get current exchange rate
   */
  async getRate(from, to) {
    const key = `${from}_${to}`;
    
    // Check cache first
    if (this.rates.has(key)) {
      return this.rates.get(key);
    }

    // Fetch from external API in production
    const rate = await this.fetchRate(from, to);
    
    // Cache the rate
    this.rates.set(key, rate);
    
    return rate;
  }

  /**
   * Fetch rate from external source (e.g., CoinGecko, Forex API)
   */
  async fetchRate(from, to) {
    // Placeholder - implement with actual API call
    // Example: Coingecko API, Forex API, etc.
    
    console.log(`Fetching rate: ${from} -> ${to}`);
    
    return {
      from,
      to,
      rate: 1.0, // Placeholder
      timestamp: new Date(),
      source: 'ExchangeRatesAPI'
    };
  }

  /**
   * Convert amount from one currency to another
   */
  async convert(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
      return amount;
    }

    const rate = await this.getRate(fromCurrency, toCurrency);
    return amount * rate.rate;
  }

  /**
   * Update all rates
   */
  async updateAllRates(pairs) {
    for (const [from, to] of pairs) {
      await this.getRate(from, to);
    }
    this.lastUpdate = new Date();
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.rates.clear();
    this.lastUpdate = null;
  }
}

module.exports = new ExchangeRatesService();
