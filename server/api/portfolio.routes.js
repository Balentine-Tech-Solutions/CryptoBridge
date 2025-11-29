// Portfolio Routes
const express = require('express');
const Portfolio = require('../models/Portfolio');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/**
 * Get user portfolio
 * GET /api/portfolio
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ userId: req.userId });

    if (!portfolio) {
      // Create portfolio if doesn't exist
      portfolio = await Portfolio.create({
        userId: req.userId,
        assets: []
      });
    }

    // Calculate metrics
    portfolio.calculateMetrics();

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
 * Add asset to portfolio
 * POST /api/portfolio/assets
 */
router.post('/assets', verifyToken, async (req, res) => {
  try {
    const { symbol, name, amount, purchasePrice, currentPrice } = req.body;

    if (!symbol || !name || !amount || !purchasePrice) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    let portfolio = await Portfolio.findOne({ userId: req.userId });

    if (!portfolio) {
      portfolio = await Portfolio.create({
        userId: req.userId,
        assets: []
      });
    }

    // Add asset
    portfolio.assets.push({
      symbol,
      name,
      amount,
      purchasePrice,
      currentPrice: currentPrice || purchasePrice,
      purchaseDate: new Date()
    });

    // Save and calculate metrics
    await portfolio.save();
    portfolio.calculateMetrics();
    await portfolio.save();

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
 * Remove asset from portfolio
 * DELETE /api/portfolio/assets/:assetId
 */
router.delete('/assets/:assetId', verifyToken, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    // Remove asset by id
    portfolio.assets = portfolio.assets.filter(a => a._id.toString() !== req.params.assetId);

    // Save and calculate metrics
    await portfolio.save();
    portfolio.calculateMetrics();
    await portfolio.save();

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

/**
 * Update asset in portfolio
 * PUT /api/portfolio/assets/:assetId
 */
router.put('/assets/:assetId', verifyToken, async (req, res) => {
  try {
    const { amount, currentPrice } = req.body;
    const portfolio = await Portfolio.findOne({ userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }

    const asset = portfolio.assets.find(a => a._id.toString() === req.params.assetId);
    if (!asset) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    // Update asset
    if (amount !== undefined) asset.amount = amount;
    if (currentPrice !== undefined) asset.currentPrice = currentPrice;

    // Save and calculate metrics
    await portfolio.save();
    portfolio.calculateMetrics();
    await portfolio.save();

    res.json({
      success: true,
      message: 'Asset updated',
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
