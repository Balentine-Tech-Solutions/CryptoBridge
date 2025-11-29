const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer', 'swap', 'conversion'],
    required: true,
  },
  fromAsset: {
    type: String,
    required: true,
  },
  toAsset: {
    type: String,
    required: true,
  },
  fromAmount: {
    type: Number,
    required: true,
  },
  toAmount: {
    type: Number,
    required: true,
  },
  exchangeRate: {
    type: Number,
    default: null,
  },
  fee: {
    type: Number,
    default: 0,
  },
  feeType: {
    type: String,
    enum: ['fixed', 'percentage'],
    default: 'percentage',
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending',
  },
  description: {
    type: String,
    default: null,
  },
  transactionHash: {
    type: String,
    default: null,
  },
  notes: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
TransactionSchema.index({ userId: 1, createdAt: -1 });
TransactionSchema.index({ status: 1 });

module.exports = mongoose.model('Transaction', TransactionSchema);
