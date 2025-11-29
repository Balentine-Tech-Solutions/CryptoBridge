/**
 * Exchange Rates Routes
 */

const express = require('express');
const exchangeRateService = require('../services/exchangeRateService');

const router = express.Router();

/**
 * Get exchange rate between two assets
 * GET /api/rates/:from/:to
 */
router.get('/:from/:to', async (req, res) => {
  try {
    const { from, to } = req.params;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        error: 'From and to assets required'
      });
    }

    const rate = await exchangeRateService.getExchangeRate(from.toUpperCase(), to.toUpperCase());

    if (rate === null) {
      return res.status(404).json({
        success: false,
        error: 'Unable to fetch exchange rate'
      });
    }

    res.json({
      success: true,
      data: {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        rate,
        timestamp: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get prices for multiple assets
 * GET /api/rates/prices?assets=BTC,ETH,BNB
 */
router.get('/prices', async (req, res) => {
  try {
    const { assets } = req.query;

    if (!assets) {
      return res.status(400).json({
        success: false,
        error: 'Assets parameter required (comma-separated)'
      });
    }

    const assetArray = assets.split(',').map(a => a.trim().toUpperCase());
    const prices = await exchangeRateService.getCryptoPrices(assetArray);

    res.json({
      success: true,
      data: prices,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get detailed crypto information
 * GET /api/rates/details?assets=BTC,ETH,BNB
 */
router.get('/details', async (req, res) => {
  try {
    const { assets } = req.query;

    if (!assets) {
      return res.status(400).json({
        success: false,
        error: 'Assets parameter required (comma-separated)'
      });
    }

    const assetArray = assets.split(',').map(a => a.trim().toUpperCase());
    const details = await exchangeRateService.getCryptoDetails(assetArray);

    res.json({
      success: true,
      data: details,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Calculate conversion amount
 * GET /api/rates/convert?from=BTC&to=USD&amount=0.5
 */
router.get('/convert', async (req, res) => {
  try {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      return res.status(400).json({
        success: false,
        error: 'From, to, and amount parameters required'
      });
    }

    const rate = await exchangeRateService.getExchangeRate(
      from.toUpperCase(),
      to.toUpperCase()
    );

    if (rate === null) {
      return res.status(404).json({
        success: false,
        error: 'Unable to fetch exchange rate'
      });
    }

    const convertedAmount = parseFloat(amount) * rate;

    res.json({
      success: true,
      data: {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        fromAmount: parseFloat(amount),
        toAmount: convertedAmount,
        rate,
        timestamp: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
