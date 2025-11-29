# CryptoBridge Development Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/CryptoBridge.git
cd CryptoBridge
```

### 2. Environment Configuration

Copy the example environment file and update it with your configuration:

```bash
cp .env.example .env
```

Edit `.env` with the following:

```env
# Database
DATABASE_URL=mongodb://localhost:27017/cryptobridge
NODE_ENV=development
PORT=5000

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=7d

# Blockchain Configuration
BLOCKCHAIN_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
STABLECOIN_ADDRESS=0x...
PRIVATE_KEY=your_private_key_here

# API Keys
STRIPE_API_KEY=sk_test_...
BANKING_API_KEY=your_banking_api_key
```

### 3. Install Dependencies

#### Backend
```bash
npm install
```

#### Frontend
```bash
cd client/web
npm install
cd ../..
```

## Running the Application

### Start MongoDB

#### Windows (if using MongoDB Community)
```powershell
mongod
```

#### macOS/Linux
```bash
mongod --dbpath /usr/local/var/mongodb
```

### Start the Backend Server

In the root directory:

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd client/web
npm start
```

The web application will open on `http://localhost:3000`

## Project Structure Quick Reference

```
CryptoBridge/
├── client/web/          # Frontend React app
├── server/              # Backend services
├── core/                # Core business logic
├── integrations/        # Third-party integrations
├── config/              # Configuration files
├── scripts/             # Utility scripts
├── docs/                # Documentation
└── tests/               # Test files
```

## Common Commands

### Development

```bash
# Start backend in development mode
npm run dev

# Start frontend in development mode
cd client/web && npm start

# Run tests
npm test

# Linting
npm run lint
```

### Production Build

```bash
# Build frontend
cd client/web && npm run build

# Build backend
npm run build
```

## Database Setup

### Connect to MongoDB

```bash
mongo
```

### Create Database

```javascript
use cryptobridge
```

### Create Collections (Optional - Mongoose will create automatically)

```javascript
db.createCollection("users")
db.createCollection("accounts")
db.createCollection("transactions")
db.createCollection("portfolios")
```

## API Testing

### Using cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","fullName":"John Doe"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Using Postman

1. Import the Postman collection from `docs/postman-collection.json`
2. Set up environment variables in Postman
3. Start making API requests

## Troubleshooting

### MongoDB Connection Error

If you get a connection error:

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Make sure MongoDB is running:
```bash
mongod
```

### Port Already in Use

If port 5000 is already in use:

```bash
# Change PORT in .env to another port (e.g., 5001)
PORT=5001
```

### Module Not Found

If you get module errors:

```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
```

### Permission Denied on Scripts

On macOS/Linux:

```bash
chmod +x scripts/*.sh
```

## Development Tools

### Recommended IDE Extensions (VS Code)

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- MongoDB for VS Code
- Postman
- Thunder Client

### Browser Extensions

- React Developer Tools
- Redux DevTools
- Metamask (for blockchain testing)

## Next Steps

1. Read the API documentation in `docs/API.md`
2. Review the architecture in `docs/ARCHITECTURE.md`
3. Check out the contribution guidelines
4. Start building features!

## Getting Help

- Check existing GitHub issues
- Read the documentation in `/docs`
- Join our community discussions
- Email support@cryptobridge.com

## Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
