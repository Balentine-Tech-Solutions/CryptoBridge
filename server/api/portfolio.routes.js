// Portfolio Routes
const express = require('express');

const router = express.Router();

// Mock portfolio database
const portfolios = new Map();

/**
 * Get Portfolio
 * GET /api/portfolio
 */
router.get('/', (req, res) => {
  try {
    const userId = req.user.userId;
    const portfolio = portfolios.get(userId) || {
      userId,
      assets: [],
      totalValue: 0,
      totalInvested: 0
    };

    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Add Asset to Portfolio
 * POST /api/portfolio/assets
 */
router.post('/assets', (req, res) => {
  try {
    const userId = req.user.userId;
    const { symbol, amount, purchasePrice } = req.body;

    if (!symbol || !amount || !purchasePrice) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    let portfolio = portfolios.get(userId);
    if (!portfolio) {
      portfolio = {
        userId,
        assets: [],
        totalValue: 0,
        totalInvested: 0
      };
    }

    const asset = {
      id: `asset_${Date.now()}`,
      symbol,
      amount,
      purchasePrice,
      value: amount * purchasePrice,
      addedAt: new Date()
    };

    portfolio.assets.push(asset);
    portfolio.totalValue += asset.value;
    portfolio.totalInvested += asset.value;

    portfolios.set(userId, portfolio);

    res.status(201).json({
      success: true,
      message: 'Asset added to portfolio',
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Remove Asset from Portfolio
 * DELETE /api/portfolio/assets/:assetId
 */
router.delete('/assets/:assetId', (req, res) => {
  try {
    const userId = req.user.userId;
    const { assetId } = req.params;

    const portfolio = portfolios.get(userId);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    const assetIndex = portfolio.assets.findIndex(a => a.id === assetId);
    if (assetIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    const removedAsset = portfolio.assets.splice(assetIndex, 1)[0];
    portfolio.totalValue -= removedAsset.value;

    portfolios.set(userId, portfolio);

    res.json({
      success: true,
      message: 'Asset removed',
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
