// Main Server Entry Point
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection
const { connectDB, disconnectDB } = require('./config/database');

// Import middleware
const { errorHandler, responseFormatter } = require('./middleware/handlers');
const { verifyToken } = require('./middleware/auth');

// Import routes
const authRoutes = require('./auth/routes');
const apiRoutes = require('./api/routes');
const transactionRoutes = require('./api/transaction.routes');
const portfolioRoutes = require('./api/portfolio.routes');
const ratesRoutes = require('./api/rates.routes');

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
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/rates', ratesRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    environment: NODE_ENV,
    version: '1.0.0',
    database: 'connected'
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
let server;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║      CryptoBridge API Server         ║
║           Running on Port ${PORT}          ║
║         Environment: ${NODE_ENV}        ║
║          Database: Connected         ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(async () => {
    await disconnectDB();
    console.log('Server closed');
    process.exit(0);
  });
});

// Start the server
startServer();

module.exports = app;
