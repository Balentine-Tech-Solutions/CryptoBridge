// Authentication Middleware and Utilities
const jwt = require('jsonwebtoken');

/**
 * Verify JWT Token
 */
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
}

/**
 * Generate JWT Token
 */
function generateToken(userId, email) {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION || '7d' }
  );
}

module.exports = {
  verifyToken,
  generateToken
};
