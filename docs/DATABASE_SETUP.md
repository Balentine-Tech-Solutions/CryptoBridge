# MongoDB Integration Guide

CryptoBridge now uses **MongoDB** with **Mongoose** for production-ready data persistence.

## 🚀 Quick Start

### 1. Install MongoDB

#### Windows
```powershell
# Using Chocolatey
choco install mongodb-community

# Or download from https://www.mongodb.com/try/download/community
```

#### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
```

#### Linux (Ubuntu)
```bash
sudo apt-get install -y mongodb
```

### 2. Start MongoDB

#### Windows
```powershell
# If installed as a service (Windows only)
net start MongoDB

# Or run manually
mongod
```

#### macOS & Linux
```bash
mongod
```

This starts MongoDB on `localhost:27017` (default)

### 3. Set Environment Variables

Create `.env` in the project root:

```env
# Required
MONGODB_URI=mongodb://localhost:27017/cryptobridge
JWT_SECRET=your-super-secret-key-change-in-production
PORT=5000

# Optional
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
COINGECKO_API_URL=https://api.coingecko.com/api/v3
```

### 4. Install Dependencies

```powershell
npm install
cd client/web
npm install
cd ../..
```

### 5. Run the Application

**Terminal 1 - Backend:**
```powershell
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd client/web
npm start
```

## 📊 Database Schema

### User Model
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  firstName: String,
  lastName: String,
  phone: String,
  country: String,
  dateOfBirth: Date,
  kycStatus: 'pending' | 'verified' | 'rejected',
  twoFactorEnabled: Boolean,
  preferences: {
    theme: 'light' | 'dark',
    currency: String,
    notifications: Boolean
  },
  verified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Model
```javascript
{
  userId: ObjectId (ref: User),
  type: 'deposit' | 'withdrawal' | 'transfer' | 'swap' | 'conversion',
  fromAsset: String,
  toAsset: String,
  fromAmount: Number,
  toAmount: Number,
  exchangeRate: Number,
  fee: Number,
  feeType: 'fixed' | 'percentage',
  status: 'pending' | 'completed' | 'failed' | 'cancelled',
  description: String,
  transactionHash: String,
  notes: String,
  createdAt: Date,
  completedAt: Date,
  updatedAt: Date
}
```

### Portfolio Model
```javascript
{
  userId: ObjectId (ref: User, unique),
  assets: [{
    symbol: String,
    name: String,
    amount: Number,
    purchasePrice: Number,
    currentPrice: Number,
    purchaseDate: Date
  }],
  totalValue: Number,
  totalInvested: Number,
  gainLoss: Number,
  gainLossPercentage: Number,
  cash: {
    USD: Number,
    EUR: Number,
    GBP: Number
  },
  lastUpdated: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)
- `POST /api/auth/logout` - Logout user

### Transactions
- `GET /api/transactions` - Get all transactions (requires token)
- `POST /api/transactions` - Create transaction (requires token)
- `GET /api/transactions/:id` - Get transaction details (requires token)
- `PUT /api/transactions/:id` - Update transaction status (requires token)

### Portfolio
- `GET /api/portfolio` - Get user portfolio (requires token)
- `POST /api/portfolio/assets` - Add asset (requires token)
- `PUT /api/portfolio/assets/:assetId` - Update asset (requires token)
- `DELETE /api/portfolio/assets/:assetId` - Remove asset (requires token)

## 🔐 Authentication

All API requests (except register/login) require a Bearer token:

```
Authorization: Bearer <token>
```

**Register and Login Flow:**

```javascript
// 1. Register
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

// Response includes token - store in localStorage

// 2. Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response includes token - store in localStorage

// 3. Access protected routes
GET /api/portfolio
Authorization: Bearer <token>
```

## 🛠️ Development Tools

### MongoDB Compass (GUI)
Download from https://www.mongodb.com/products/compass

Connect to `mongodb://localhost:27017` to visually manage your database.

### MongoDB Atlas (Cloud)
For production, use MongoDB Atlas:
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cryptobridge
```

## 🧪 Testing

### Test User Registration
```powershell
$headers = @{"Content-Type" = "application/json"}
$body = @{
    email = "test@cryptobridge.com"
    password = "Test@1234"
    firstName = "Test"
    lastName = "User"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -Headers $headers `
  -Body $body
```

### Test User Login
```powershell
$headers = @{"Content-Type" = "application/json"}
$body = @{
    email = "test@cryptobridge.com"
    password = "Test@1234"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
  -Method POST `
  -Headers $headers `
  -Body $body
```

### Test Protected Route
```powershell
$token = "your-token-from-login"
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

Invoke-WebRequest -Uri "http://localhost:5000/api/portfolio" `
  -Method GET `
  -Headers $headers
```

## 🚨 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service: `net start MongoDB` (Windows) or `mongod` (macOS/Linux)

### Invalid Token
```
Error: Invalid or expired token
```
**Solution:** 
- Make sure token is fresh from login/register
- Include "Bearer" before token: `Authorization: Bearer <token>`
- Token expires after 7 days by default

### User Already Exists
```
Error: User already registered
```
**Solution:** Use a different email or delete user from database

### Cannot Connect to MongoDB Atlas
```
Error: connect ENOTFOUND cluster.mongodb.net
```
**Solution:** 
- Check connection string in `.env`
- Whitelist your IP in MongoDB Atlas Security settings

## 📈 Production Deployment

Before deploying to production:

1. **Change JWT Secret**
   ```env
   JWT_SECRET=generate-a-strong-random-string
   ```

2. **Use MongoDB Atlas** instead of local MongoDB

3. **Set Production Environment**
   ```env
   NODE_ENV=production
   ```

4. **Configure CORS** for your domain
   ```env
   CORS_ORIGIN=https://yourdomain.com
   ```

5. **Enable HTTPS** for all connections

6. **Add Rate Limiting**

7. **Set up Monitoring** and Alerts

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Database Integration Complete! ✅**

Your CryptoBridge application now uses MongoDB for persistent data storage with Mongoose for schema validation and type safety.
