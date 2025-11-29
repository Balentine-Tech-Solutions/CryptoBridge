// API Routes Configuration
const express = require('express');
const router = express.Router();

// Import route handlers (to be created)
// const authRoutes = require('../auth/routes');
// const currencyRoutes = require('../currency/routes');
// const transactionRoutes = require('../transactions/routes');
// const portfolioRoutes = require('../portfolio/routes');

// Mount routes
// router.use('/auth', authRoutes);
// router.use('/currency', currencyRoutes);
// router.use('/transactions', transactionRoutes);
// router.use('/portfolio', portfolioRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    version: '1.0.0'
  });
});

module.exports = router;
