# CryptoBridge

**Bridging Crypto and Traditional Finance**

CryptoBridge is a comprehensive platform that seamlessly integrates cryptocurrency and traditional financial services, enabling users to manage their digital assets alongside conventional banking, investments, and remittances.

## 🎯 Mission

To empower users globally by providing seamless access to both cryptocurrency and traditional financial services through a unified, compliant, and user-friendly platform.

## 📋 Project Structure

```
CryptoBridge/
├── client/
│ ├── web/              # React web application
│ │ ├── public/
│ │ ├── src/
│ │ │ ├── components/   # Reusable UI components
│ │ │ ├── pages/        # Page-level views
│ │ │ └── styles/       # CSS/SCSS files
│ │ └── package.json
│ └── mobile/           # iOS and Android native apps
│ ├── ios/
│ └── android/
│
├── server/             # Backend API services
│ ├── api/              # API gateway and routes
│ ├── auth/             # Authentication & authorization
│ ├── currency/         # Currency management
│ ├── bank/             # Banking integrations
│ ├── debit-card/       # Debit card services
│ ├── remittance/       # Cross-border transfers
│ ├── literacy-dashboard/ # Financial literacy tools
│ ├── notifications/    # Push/email notifications
│ ├── community-pools/  # Collective investment pools
│ └── investments/      # Investment management
│ ├── crypto/           # Cryptocurrency investments
│ └── stocks/           # Stock trading
│
├── core/               # Core business logic
│ ├── exchange-rates/   # Real-time exchange rates
│ ├── transaction-engine/ # Transaction processing
│ ├── compliance/       # KYC/AML compliance
│ ├── stablecoin-gateway/ # Stablecoin integration
│ ├── offline-mode/     # Offline functionality
│ └── portfolio-management/ # Portfolio tracking
│
├── integrations/       # Third-party integrations
│ ├── blockchain/       # Blockchain interactions
│ ├── banking/          # Bank API integrations
│ ├── i18n/             # Internationalization
│ ├── card-networks/    # Card payment networks
│ └── brokerage/        # Brokerage integrations
│
├── config/             # Configuration files
├── scripts/            # Utility scripts
├── docs/               # Documentation
├── tests/              # Test suites
├── .env.example        # Environment variables template
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MongoDB 4.4+ (local or MongoDB Atlas cloud)
- npm or yarn

### Quick Start

#### 1. Setup Repository
```bash
# Clone repository
git clone https://github.com/Balentine-Tech-Solutions/CryptoBridge.git
cd CryptoBridge

# Install backend dependencies
npm install

# Install frontend dependencies
cd client/web
npm install
cd ../..
```

#### 2. Configure Environment
```bash
cp .env.example .env
```

Update `.env` with MongoDB connection:
```env
MONGODB_URI=mongodb://localhost:27017/cryptobridge
JWT_SECRET=your-super-secret-key-change-in-production
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

#### 3. Start MongoDB
```powershell
# Windows
net start MongoDB

# macOS/Linux
mongod
```

#### 4. Run Application

**Terminal 1 - Backend (port 5000):**
```bash
npm start
```

**Terminal 2 - Frontend (port 3000):**
```bash
cd client/web
npm start
```

The app will open at `http://localhost:3000` with working authentication, dashboard, and portfolio management.

## 📊 MVP Features

### ✅ Authentication
- User registration with email/password
- Secure login with JWT tokens
- Protected routes for authenticated users
- User profile management

### ✅ Dashboard
- Portfolio overview with total value
- Asset holdings display
- Recent transaction history
- Account performance metrics

### ✅ Portfolio Management
- View all cryptocurrency assets
- Add new assets with purchase prices
- Track asset allocation
- Calculate gains/losses
- Real-time market prices

### ✅ Real Exchange Rates (via CoinGecko API)
- Live cryptocurrency prices (16+ cryptocurrencies)
- USD/EUR/GBP conversion rates
- 24-hour price changes
- Trading volume and market cap
- Conversion amount calculations

### ✅ Transaction History
- Track all transactions (buy, sell, swap)
- Transaction status (pending, completed, failed)
- Detailed transaction records
- Exchange rates at time of transaction

### ✅ User Interface
- Responsive design (mobile, tablet, desktop)
- Light/dark theme toggle
- Glass morphism components
- Accessible navigation (WCAG 2.1 AA)
- Real-time market data display

## 🗄️ Database Architecture

### MongoDB Collections
- **users** - User accounts with authentication
- **transactions** - Transaction history with details
- **portfolios** - Asset holdings and performance

See [DATABASE_SETUP.md](docs/DATABASE_SETUP.md) for complete schema documentation.

## 📡 API Reference

### Base URL
```
http://localhost:5000
```

### Authentication Endpoints
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Exchange Rates API
- `GET /api/rates/:from/:to` - Get exchange rate (e.g., `/api/rates/BTC/USD`)
- `GET /api/rates/prices?assets=BTC,ETH,BNB` - Get multiple prices
- `GET /api/rates/details?assets=BTC,ETH` - Get detailed market info
- `GET /api/rates/convert?from=BTC&to=USD&amount=0.5` - Calculate conversion

### Portfolio Endpoints
- `GET /api/portfolio` - Get user portfolio
- `POST /api/portfolio/assets` - Add asset
- `PUT /api/portfolio/assets/:id` - Update asset
- `DELETE /api/portfolio/assets/:id` - Remove asset

### Transaction Endpoints
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/:id` - Get transaction details
- `PUT /api/transactions/:id` - Update transaction status

### Health Check
- `GET /health` - Server health status

## 🧪 Testing

See [TESTING.md](docs/TESTING.md) for:
- cURL/Postman API testing examples
- Frontend testing workflow
- Browser testing scenarios
- Error scenario testing
- Database verification
- Performance load testing

## 📚 Documentation

- [API Documentation](docs/API.md) - Complete API reference
- [Database Setup Guide](docs/DATABASE_SETUP.md) - MongoDB integration and schema
- [Testing Guide](docs/TESTING.md) - Comprehensive testing procedures
- [Architecture Guide](docs/ARCHITECTURE.md) - System design
- [Deployment Guide](docs/deployment/) - Cloud deployment

### Getting Started

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- npm or yarn

### Quick Start

#### Web Client
```bash
cd client/web
npm install
npm start
```

#### Server
```bash
npm install
cp .env.example .env
npm run dev
```

### Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update with your configuration:
- Database connection strings
- API keys and secrets
- JWT secrets
- Third-party service credentials

## 🛠️ Development

### Running the Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## 📦 Key Features

- **Multi-Currency Support**: Manage crypto and traditional currencies seamlessly
- **Banking Integration**: Connect with traditional banks securely
- **Debit Card Services**: Virtual and physical debit cards
- **Cross-Border Remittances**: Fast international transfers with competitive rates
- **Investment Management**: Crypto and stock portfolios in one place
- **Community Pools**: Collective investment groups for community members
- **Financial Literacy**: Educational dashboard for financial empowerment
- **Real-Time Exchange Rates**: Live currency conversion and market data
- **Compliance**: Built-in KYC/AML features for regulatory compliance
- **Offline Mode**: Continue using the app when offline
- **Notifications**: Real-time alerts and updates via email, SMS, and push
- **Portfolio Analytics**: Advanced analytics and performance tracking

## 🔐 Security

- JWT-based authentication with refresh tokens
- bcrypt password hashing with configurable salt rounds
- AML/KYC compliance checks integrated
- Secure API endpoints with CORS configuration
- Environment-based configuration for secrets
- End-to-end encryption for sensitive data
- Regular security audits and penetration testing

## 📚 Documentation

- **[API Documentation](docs/API.md)** - Complete API reference
- **[Architecture Guide](docs/ARCHITECTURE.md)** - System design and components
- **[Setup Guide](docs/SETUP.md)** - Detailed development setup instructions
- **[Deployment](docs/deployment/)** - Cloud deployment guides

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test -- --coverage

# Run specific test file
npm run test -- server/auth/auth.test.js
```

Tests are located in the `/tests` directory with unit, integration, and e2e tests.

## 🚢 Deployment

### Docker

```bash
docker build -t cryptobridge:latest .
docker run -p 5000:5000 \
  -e DATABASE_URL=mongodb://mongo:27017/cryptobridge \
  -e JWT_SECRET=your_secret_key \
  cryptobridge:latest
```

### Docker Compose

```bash
docker-compose up
```

### Cloud Platforms

- **AWS**: EC2, RDS, Lambda, S3
- **GCP**: Cloud Run, Firestore, Cloud Storage
- **Azure**: App Service, Cosmos DB, Blob Storage

See `/docs/deployment` for detailed guides.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

### Code Style

- ESLint configuration included
- Prettier for code formatting
- Pre-commit hooks configured

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support & Community

- **Email**: support@cryptobridge.com
- **Discord**: [Join our community](https://discord.gg/cryptobridge)
- **GitHub Issues**: [Report bugs](https://github.com/Balentine-Tech-Solutions/CryptoBridge/issues)
- **Documentation**: [docs/](docs/)

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Project structure setup
- [ ] Core authentication system
- [ ] Basic API endpoints
- [ ] Web dashboard MVP

### Phase 2
- [ ] Mobile app MVP (iOS/Android)
- [ ] Enhanced compliance features
- [ ] Advanced analytics dashboard
- [ ] Additional blockchain support

### Phase 3
- [ ] Machine learning fraud detection
- [ ] Decentralized governance token
- [ ] Advanced DeFi features
- [ ] API marketplace

## 🙏 Acknowledgments

- Our amazing community of contributors
- Blockchain and fintech partners
- The open-source community for incredible tools and libraries

## 👥 Team

CryptoBridge is developed and maintained by **Balentine Tech Solutions**

## 📊 Status

- **Version**: 1.0.0
- **Status**: Early Development
- **Last Updated**: November 2025
- **Maintained**: Yes