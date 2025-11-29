# CryptoBridge Quick Reference Guide

## 🚀 Quick Start Commands

### Setup
```bash
# Install root dependencies
npm install

# Install web client dependencies
cd client/web && npm install

# Go back to root
cd ../..

# Setup environment
cp .env.example .env
```

### Development
```bash
# Start backend server (from root)
npm run dev

# Start frontend (in new terminal)
cd client/web
npm start

# Run tests
npm run test

# Linting
npm run lint
```

### Building
```bash
# Build frontend
cd client/web && npm run build

# Build entire project
npm run build
```

## 📁 Key Directories Guide

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `client/web/src` | React components and pages | app.js, components/, pages/ |
| `server/auth` | User authentication | auth.js |
| `server/api` | API routes | routes.js |
| `core/transaction-engine` | Transaction processing | engine.js |
| `core/compliance` | KYC/AML checks | compliance.js |
| `core/exchange-rates` | Currency rates | service.js |
| `integrations/blockchain` | Web3 connections | integration.js |
| `integrations/banking` | Bank APIs | integration.js |
| `config/` | Configuration | app.js, database.js |
| `docs/` | Documentation | API.md, ARCHITECTURE.md |

## 🔧 Environment Variables

```env
# Essential Variables
DATABASE_URL=mongodb://localhost:27017/cryptobridge
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

# Optional: Blockchain
BLOCKCHAIN_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY

# Optional: Payment Processing
STRIPE_API_KEY=sk_test_...

# Optional: Banking
BANKING_API_KEY=your_key

# Optional: Localization
SUPPORTED_LANGUAGES=en,es,fr,pt,sw
```

## 📚 API Endpoints (To Implement)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Exchange Rates
- `GET /api/exchange-rates?from=BTC&to=USD` - Get conversion rate
- `GET /api/exchange-rates/all` - Get all rates

### Transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/:id` - Get transaction details
- `GET /api/transactions/user/:userId` - Get user transactions

### Portfolio
- `GET /api/portfolio` - Get user portfolio
- `POST /api/portfolio/assets` - Add asset
- `DELETE /api/portfolio/assets/:assetId` - Remove asset

## 🔐 Authentication Flow

```
1. User Registration
   ↓
2. Password Hashing (bcrypt)
   ↓
3. User Stored in Database
   ↓
4. User Login
   ↓
5. Credentials Validated
   ↓
6. JWT Token Generated
   ↓
7. Token Sent to Client
   ↓
8. Client Stores Token (localStorage)
   ↓
9. Include Token in Authorization Header for Protected Routes
```

## 🧪 Testing Guide

### Run All Tests
```bash
npm run test
```

### Run Specific Test File
```bash
npm run test -- tests/auth.test.js
```

### Run with Coverage
```bash
npm run test -- --coverage
```

### Test Structure
```javascript
describe('Feature Name', () => {
  it('should do something', () => {
    expect(result).toBe(expected);
  });
});
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Start MongoDB
mongod

# Test connection
mongo
```

### Port Already in Use
```bash
# Change in .env file
PORT=5001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -r node_modules package-lock.json
npm install
```

### Clear Cache
```bash
npm cache clean --force
```

## 📦 Project Dependencies

### Frontend (React)
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.0.0",
  "axios": "^1.6.0"
}
```

### Backend (Node.js)
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.1.0",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.3.1"
}
```

## 🎯 Service Architecture

```
┌─────────────────────────────┐
│   React Web App / Mobile    │
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│      API Gateway/Router     │
└────────────┬────────────────┘
             │
┌────────────▼────────────────────────┐
│      Microservices                  │
│  Auth │ API │ Currency │ Bank │ ... │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│      Core Services                  │
│  Transaction │ Compliance │ Portfolio
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│      Database & Integrations        │
│  MongoDB │ Blockchain │ Banking      │
└─────────────────────────────────────┘
```

## 💾 Database Collections (To Create)

- `users` - User profiles
- `accounts` - Financial accounts
- `transactions` - Transaction history
- `portfolios` - Investment holdings
- `cards` - Virtual/physical cards
- `kyc` - KYC verification data
- `aml` - AML check results
- `notifications` - User notifications

## 🚀 Deployment Checklist

- [ ] All environment variables configured
- [ ] Database backups set up
- [ ] SSL certificates installed
- [ ] Rate limiting configured
- [ ] Logging enabled
- [ ] Monitoring set up
- [ ] Error tracking (Sentry)
- [ ] CDN configured for static assets
- [ ] CORS properly configured
- [ ] Database indexes optimized

## 📞 Getting Help

1. Check `docs/` folder
2. Review `PROJECT_SETUP_SUMMARY.md`
3. Look at code examples in `server/` and `client/`
4. Check GitHub issues
5. Contact support@cryptobridge.com

## 🎓 Learning Path

1. **Start with**: `docs/SETUP.md` (local development setup)
2. **Then read**: `docs/ARCHITECTURE.md` (understand system design)
3. **Then explore**: `docs/API.md` (API reference)
4. **Then implement**: Start with authentication service
5. **Then add**: Transaction processing
6. **Then build**: UI components
7. **Then integrate**: External services

## 📊 Useful Commands Reference

```bash
# Package Management
npm install                    # Install dependencies
npm install <package>          # Install specific package
npm update                     # Update packages
npm list                       # List installed packages

# Development
npm run dev                    # Start development server
npm run build                  # Build project
npm run test                   # Run tests
npm run lint                   # Run linter

# Database
mongo                          # Connect to MongoDB
db.collections()              # List all collections
db.collection.find()          # Query data

# Git
git init                       # Initialize repository
git add .                      # Stage changes
git commit -m "message"        # Commit changes
git push                       # Push to remote

# System
node --version                 # Check Node.js version
npm --version                  # Check npm version
mongod                         # Start MongoDB server
```

## ✨ Pro Tips

1. **Use nodemon for development** - Auto-restart on file changes
2. **Use environment variables** - Never hardcode secrets
3. **Test early and often** - Catch bugs before production
4. **Document your code** - Add JSDoc comments
5. **Use meaningful variable names** - Makes debugging easier
6. **Separate concerns** - Keep logic modular
7. **Use git branches** - One feature per branch
8. **Keep dependencies updated** - Security patches important
9. **Monitor performance** - Use APM tools
10. **Log strategically** - Help debug issues in production

---

**Last Updated**: November 28, 2025  
**Version**: 1.0.0
