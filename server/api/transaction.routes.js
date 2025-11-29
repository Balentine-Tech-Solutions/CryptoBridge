// Transaction Routes
const express = require('express');
const { verifyToken } = require('../middleware/auth');
const TransactionEngine = require('../../core/transaction-engine/engine');

const router = express.Router();

// Mock transaction database
const transactions = [];

/**
 * Create Transaction
 * POST /api/transactions
 */
router.post('/', verifyToken, async (req, res) => {
  try {
    const { fromCurrency, toCurrency, amount, type } = req.body;

    if (!fromCurrency || !toCurrency || !amount || !type) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const transaction = {
      id: `TXN_${Date.now()}`,
      userId: req.user.userId,
      fromCurrency,
      toCurrency,
      amount,
      type,
      status: 'completed',
      createdAt: new Date(),
      timestamp: Date.now()
    };

    transactions.push(transaction);

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
 * Get Transactions
 * GET /api/transactions
 */
router.get('/', verifyToken, (req, res) => {
  try {
    const userTransactions = transactions.filter(t => t.userId === req.user.userId);

    res.json({
      success: true,
      data: userTransactions,
      count: userTransactions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get Transaction by ID
 * GET /api/transactions/:id
 */
router.get('/:id', verifyToken, (req, res) => {
  try {
    const transaction = transactions.find(
      t => t.id === req.params.id && t.userId === req.user.userId
    );

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

module.exports = router;
