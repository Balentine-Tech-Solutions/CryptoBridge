// Application Configuration
module.exports = {
  app: {
    name: 'CryptoBridge',
    version: '1.0.0',
    description: 'Bridging Crypto and Traditional Finance',
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development'
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION || '7d',
    saltRounds: 10
  },
  crypto: {
    blockchainRpcUrl: process.env.BLOCKCHAIN_RPC_URL,
    stablecoinAddress: process.env.STABLECOIN_ADDRESS,
    privateKey: process.env.PRIVATE_KEY
  },
  integrations: {
    banking: {
      apiKey: process.env.BANKING_API_KEY,
      apiSecret: process.env.BANKING_API_SECRET
    },
    stripe: {
      apiKey: process.env.STRIPE_API_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY
    }
  },
  i18n: {
    supportedLanguages: (process.env.SUPPORTED_LANGUAGES || 'en').split(','),
    defaultLanguage: 'en'
  }
};
