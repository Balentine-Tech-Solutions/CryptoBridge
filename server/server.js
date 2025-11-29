// Main Server Entry Point
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import middleware
const { errorHandler, responseFormatter } = require('./middleware/handlers');
const { verifyToken } = require('./middleware/auth');

// Import routes
const authRoutes = require('./auth/routes');
const apiRoutes = require('./api/routes');
const transactionRoutes = require('./api/transaction.routes');
const portfolioRoutes = require('./api/portfolio.routes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Response formatter middleware
app.use(responseFormatter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/', apiRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/portfolio', verifyToken, portfolioRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    environment: NODE_ENV,
    version: '1.0.0'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║      CryptoBridge API Server         ║
║           Running on Port ${PORT}          ║
║         Environment: ${NODE_ENV}        ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;
