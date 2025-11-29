# CryptoBridge MVP - Getting Started

## 🚀 Quick Start Guide

This is the MVP (Minimum Viable Product) version of CryptoBridge. Follow these steps to get it running locally.

## 📋 Prerequisites

- Node.js 16+ installed
- npm or yarn
- Git

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Balentine-Tech-Solutions/CryptoBridge.git
cd CryptoBridge
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client/web
npm install
cd ../..
```

### 4. Configure Environment Variables
```bash
cp .env.example .env
```

Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=7d
CORS_ORIGIN=http://localhost:3000
```

## 🏃 Running the MVP

### Terminal 1: Start Backend Server
```bash
npm start
```

Backend will start on `http://localhost:5000`

### Terminal 2: Start Frontend Development Server
```bash
cd client/web
npm start
```

Frontend will open on `http://localhost:3000`

## 📖 MVP Features

### ✅ Authentication
- User Registration
- User Login
- JWT Token Management
- Protected Routes

### ✅ Dashboard
- Portfolio Overview
- Asset Holdings
- Recent Transactions
- Account Status

### ✅ Portfolio Management
- View All Assets
- Asset Allocation
- Performance Metrics
- Asset Details

### ✅ User Interface
- Responsive Design
- Light/Dark Mode
- Glass Morphism Components
- Accessible Navigation

### ✅ API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

#### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/:id` - Get transaction details

#### Portfolio
- `GET /api/portfolio` - Get user portfolio
- `POST /api/portfolio/assets` - Add asset
- `DELETE /api/portfolio/assets/:assetId` - Remove asset

## 🧪 Testing the MVP

### Test User Account
You can register a new account or use test credentials:
- Email: `test@cryptobridge.com`
- Password: `test123456`

### Sample Transactions
The dashboard includes mock data showing:
- Bitcoin holdings (0.5 BTC)
- Ethereum holdings (5 ETH)
- USD balance ($7,430.50)

## 🗂️ Project Structure

```
CryptoBridge/
├── client/web/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── PopoverMenu/
│   │   │   ├── GlassCard/
│   │   │   └── ThemeToggle/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── PortfolioPage.jsx
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── theme.css
│   │   │   ├── glass.css
│   │   │   ├── pages.css
│   │   │   └── accessibility.css
│   │   └── app.js
│   └── package.json
├── server/
│   ├── auth/
│   │   └── routes.js
│   ├── api/
│   │   ├── routes.js
│   │   ├── transaction.routes.js
│   │   └── portfolio.routes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── handlers.js
│   ├── server.js
│   └── package.json
├── core/
├── integrations/
├── config/
└── docs/
```

## 🔐 Security Notes

⚠️ **Important**: This MVP uses in-memory data storage. For production:
1. Set up MongoDB or PostgreSQL
2. Use secure environment variables
3. Enable HTTPS
4. Implement rate limiting
5. Add request validation
6. Set up proper CORS policies

## 🚢 Next Steps for Production

1. **Database Integration**
   - Replace in-memory storage with MongoDB/PostgreSQL
   - Implement data models and migrations

2. **Blockchain Integration**
   - Connect to Web3 providers
   - Implement stablecoin operations

3. **Payment Processing**
   - Integrate Stripe or similar
   - Set up bank transfers

4. **Real Exchange Rates**
   - Connect to CoinGecko or similar API
   - Implement real-time updates

5. **Mobile Apps**
   - Build iOS/Android native apps
   - Implement push notifications

6. **KYC/AML Compliance**
   - Integrate compliance services
   - Implement document verification

## 📞 Support

- 📖 [API Documentation](docs/API.md)
- 🏗️ [Architecture Guide](docs/ARCHITECTURE.md)
- 📚 [Setup Guide](docs/SETUP.md)

## 📝 License

MIT License - See LICENSE file for details

## 👨‍💻 Development

### Code Style
- ESLint + Prettier configured
- Use meaningful variable names
- Add JSDoc comments for functions

### Branch Strategy
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches

### Commit Messages
```
[TYPE] Brief description

TYPE: feat, fix, docs, style, refactor, test
```

## 🎯 MVP Checklist

- ✅ Frontend UI with responsive design
- ✅ User authentication (register/login)
- ✅ Dashboard with portfolio overview
- ✅ Portfolio management page
- ✅ API endpoints for core features
- ✅ Light/dark theme support
- ✅ Accessibility compliance (WCAG 2.1)
- ✅ Protected routes
- ✅ Error handling
- ✅ Mock data for testing

---

**Status**: MVP Ready 🚀  
**Version**: 1.0.0  
**Last Updated**: November 28, 2025
