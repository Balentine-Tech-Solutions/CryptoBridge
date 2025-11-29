// Database Configuration
module.exports = {
  development: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    database: process.env.DB_NAME || 'cryptobridge',
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/cryptobridge'
  },
  production: {
    url: process.env.DATABASE_URL
  },
  test: {
    url: process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/cryptobridge-test'
  }
};
