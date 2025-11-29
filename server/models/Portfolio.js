const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: Number,
    default: null,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

const PortfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  assets: [AssetSchema],
  totalValue: {
    type: Number,
    default: 0,
  },
  totalInvested: {
    type: Number,
    default: 0,
  },
  gainLoss: {
    type: Number,
    default: 0,
  },
  gainLossPercentage: {
    type: Number,
    default: 0,
  },
  cash: {
    USD: {
      type: Number,
      default: 10000,
    },
    EUR: {
      type: Number,
      default: 0,
    },
    GBP: {
      type: Number,
      default: 0,
    },
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate portfolio metrics
PortfolioSchema.methods.calculateMetrics = function () {
  let totalValue = 0;
  let totalInvested = 0;

  this.assets.forEach((asset) => {
    const currentValue = asset.amount * (asset.currentPrice || asset.purchasePrice);
    const investedValue = asset.amount * asset.purchasePrice;

    totalValue += currentValue;
    totalInvested += investedValue;
  });

  // Add cash value
  totalValue += this.cash.USD;
  totalInvested += this.cash.USD;

  this.totalValue = totalValue;
  this.totalInvested = totalInvested;
  this.gainLoss = totalValue - totalInvested;
  this.gainLossPercentage = totalInvested > 0 ? (this.gainLoss / totalInvested) * 100 : 0;

  return this;
};

// Index for faster queries
PortfolioSchema.index({ userId: 1 });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
