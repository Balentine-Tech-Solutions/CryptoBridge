// Transaction Routes
const express = require('express');
const Transaction = require('../models/Transaction');
const Portfolio = require('../models/Portfolio');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/**
 * Get all transactions for user
 * GET /api/transactions
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get specific transaction
 * GET /api/transactions/:id
 */
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Create transaction
 * POST /api/transactions
 */
router.post('/', verifyToken, async (req, res) => {
  try {
    const { type, fromAsset, toAsset, fromAmount, toAmount, exchangeRate, description } = req.body;

    // Validation
    if (!type || !fromAsset || !toAsset || !fromAmount || !toAmount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Create transaction
    const transaction = await Transaction.create({
      userId: req.userId,
      type,
      fromAsset,
      toAsset,
      fromAmount,
      toAmount,
      exchangeRate: exchangeRate || null,
      description: description || '',
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Transaction created',
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Update transaction status
 * PUT /api/transactions/:id
 */
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { status, completedAt } = req.body;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      {
        status,
        completedAt: status === 'completed' ? new Date() : completedAt,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      message: 'Transaction updated',
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
