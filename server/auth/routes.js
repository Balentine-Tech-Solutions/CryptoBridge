// Authentication Routes
const express = require('express');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');

const router = express.Router();

// Mock user database (replace with MongoDB)
const users = new Map();

/**
 * Register endpoint
 * POST /api/auth/register
 */
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Check if user exists
    if (users.has(email)) {
      return res.status(409).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = `user_${Date.now()}`;
    users.set(email, {
      id: userId,
      fullName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      kyc: { status: 'pending' },
      portfolio: { assets: [] }
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { id: userId, fullName, email }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Login endpoint
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password required'
      });
    }

    // Find user
    const user = users.get(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user.id, user.email);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
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
 * Logout endpoint
 * POST /api/auth/logout
 */
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = router;
