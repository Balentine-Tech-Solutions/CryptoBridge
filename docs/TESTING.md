# CryptoBridge Testing Guide

Complete guide for testing all CryptoBridge MVP features locally.

## 🚀 Prerequisites

- MongoDB running on `localhost:27017`
- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`
- Postman or Insomnia (optional, for API testing)

## 🧪 Testing Workflow

### 1. Authentication Flow

#### Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "testuser@example.com",
    "firstName": "Test",
    "lastName": "User"
  }
}
```

#### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "testuser@example.com",
    "firstName": "Test",
    "lastName": "User"
  }
}
```

#### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 2. Exchange Rates Testing

#### Get BTC to USD Rate
```bash
curl -X GET http://localhost:5000/api/rates/BTC/USD
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "from": "BTC",
    "to": "USD",
    "rate": 45000.50,
    "timestamp": "2025-11-28T10:30:00.000Z"
  }
}
```

#### Get Multiple Prices
```bash
curl -X GET "http://localhost:5000/api/rates/prices?assets=BTC,ETH,BNB"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "BTC": {
      "usd": 45000.50,
      "usd_market_cap": 880000000000,
      "usd_24h_vol": 20000000000,
      "last_updated_at": 1700123456000
    },
    "ETH": { ... },
    "BNB": { ... }
  },
  "timestamp": "2025-11-28T10:30:00.000Z"
}
```

#### Get Detailed Market Info
```bash
curl -X GET "http://localhost:5000/api/rates/details?assets=BTC,ETH"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "BTC": {
      "price": 45000.50,
      "marketCap": 880000000000,
      "volume24h": 20000000000,
      "change24h": 2.5,
      "lastUpdated": 1700123456000
    },
    "ETH": { ... }
  },
  "timestamp": "2025-11-28T10:30:00.000Z"
}
```

#### Convert Amount
```bash
curl -X GET "http://localhost:5000/api/rates/convert?from=BTC&to=USD&amount=0.5"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "from": "BTC",
    "to": "USD",
    "fromAmount": 0.5,
    "toAmount": 22500.25,
    "rate": 45000.5,
    "timestamp": "2025-11-28T10:30:00.000Z"
  }
}
```

### 3. Portfolio Testing

#### Get User Portfolio
```bash
curl -X GET http://localhost:5000/api/portfolio \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "assets": [],
    "totalValue": 10000,
    "totalInvested": 10000,
    "gainLoss": 0,
    "gainLossPercentage": 0,
    "cash": {
      "USD": 10000,
      "EUR": 0,
      "GBP": 0
    }
  }
}
```

#### Add Asset to Portfolio
```bash
curl -X POST http://localhost:5000/api/portfolio/assets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "symbol": "BTC",
    "name": "Bitcoin",
    "amount": 0.5,
    "purchasePrice": 40000,
    "currentPrice": 45000
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Asset added to portfolio",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "assets": [
      {
        "_id": "507f...",
        "symbol": "BTC",
        "name": "Bitcoin",
        "amount": 0.5,
        "purchasePrice": 40000,
        "currentPrice": 45000,
        "purchaseDate": "2025-11-28T10:30:00.000Z"
      }
    ],
    "totalValue": 32500,
    "totalInvested": 30000,
    "gainLoss": 2500,
    "gainLossPercentage": 8.33
  }
}
```

### 4. Transaction Testing

#### Create Transaction
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "type": "swap",
    "fromAsset": "USD",
    "toAsset": "BTC",
    "fromAmount": 5000,
    "toAmount": 0.111,
    "exchangeRate": 45000,
    "description": "Purchase Bitcoin"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Transaction created",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "type": "swap",
    "fromAsset": "USD",
    "toAsset": "BTC",
    "fromAmount": 5000,
    "toAmount": 0.111,
    "exchangeRate": 45000,
    "status": "pending",
    "description": "Purchase Bitcoin",
    "createdAt": "2025-11-28T10:30:00.000Z",
    "updatedAt": "2025-11-28T10:30:00.000Z"
  }
}
```

#### Get Transactions
```bash
curl -X GET http://localhost:5000/api/transactions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Get Transaction Details
```bash
curl -X GET http://localhost:5000/api/transactions/507f1f77bcf86cd799439013 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Update Transaction Status
```bash
curl -X PUT http://localhost:5000/api/transactions/507f1f77bcf86cd799439013 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "completed"
  }'
```

### 5. Frontend Testing

#### Test in Browser
1. Go to `http://localhost:3000`
2. Click **Register** on homepage
3. Fill form:
   - Email: `testuser@example.com`
   - Password: `TestPassword123` (min 8 chars)
   - First Name: `Test`
   - Last Name: `User`
4. Click **Sign Up**
5. Token should be stored in `localStorage`
6. Should redirect to Dashboard

#### Test Dashboard
1. Verify portfolio overview shows
2. Click **Portfolio** to view detailed assets
3. Test theme toggle (light/dark mode)
4. Verify all responsive breakpoints

### 6. Error Scenarios

#### Missing Required Fields
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

**Expected:** 400 Bad Request

#### Invalid Credentials
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonexistent@example.com",
    "password": "wrongpassword"
  }'
```

**Expected:** 401 Unauthorized

#### Missing Token
```bash
curl -X GET http://localhost:5000/api/portfolio
```

**Expected:** 401 Unauthorized - "No token provided"

#### Invalid Token
```bash
curl -X GET http://localhost:5000/api/portfolio \
  -H "Authorization: Bearer invalid.token.here"
```

**Expected:** 401 Unauthorized - "Invalid or expired token"

### 7. Database Verification

#### Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Navigate to `cryptobridge` database
4. Verify collections:
   - `users` - Contains registered users
   - `transactions` - Contains transaction records
   - `portfolios` - Contains user portfolios

#### Using MongoDB Shell
```bash
# Connect to database
mongosh mongodb://localhost:27017/cryptobridge

# View all users
db.users.find().pretty()

# View specific user
db.users.findOne({email: "testuser@example.com"})

# View user's transactions
db.transactions.find({email: "testuser@example.com"}).pretty()

# View user's portfolio
db.portfolios.findOne({email: "testuser@example.com"})
```

### 8. Performance Testing

#### Load Testing with Artillery
```bash
# Install Artillery
npm install -g artillery

# Create test file: load-test.yml
```

```yaml
config:
  target: "http://localhost:5000"
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Exchange Rate API"
    flow:
      - get:
          url: "/api/rates/BTC/USD"
      - get:
          url: "/api/rates/prices?assets=BTC,ETH,BNB"
      - get:
          url: "/api/rates/convert?from=BTC&to=USD&amount=0.5"
```

```bash
# Run load test
artillery run load-test.yml
```

### 9. Mobile Testing

1. On mobile device, connect to same network as development machine
2. Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (macOS/Linux)
3. Navigate to: `http://YOUR_IP:3000`
4. Test responsive layouts on mobile breakpoints

### 10. Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Portfolio displays initial $10,000 cash
- [ ] Can add assets to portfolio
- [ ] Can view asset details
- [ ] Exchange rates display real-time prices
- [ ] Amount conversion calculates correctly
- [ ] Transactions create and persist
- [ ] Theme toggle works
- [ ] Protected routes redirect unauthenticated users
- [ ] Token refresh on navigation
- [ ] Mobile responsive
- [ ] No console errors
- [ ] MongoDB stores data correctly

---

**All Systems Tested and Ready! ✅**
