# CryptoBridge API Documentation

## Overview

CryptoBridge API provides a comprehensive set of endpoints for managing cryptocurrency and traditional financial services.

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.cryptobridge.com/api
```

## Authentication

All requests require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": "John Doe"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Exchange Rates

#### Get Current Rates
```
GET /exchange-rates?from=BTC&to=USD
```

### Transactions

#### Create Transaction
```
POST /transactions
Content-Type: application/json

{
  "type": "transfer",
  "fromCurrency": "BTC",
  "toCurrency": "USD",
  "amount": 0.5,
  "recipient": "recipient_wallet_address"
}
```

### Portfolio

#### Get Portfolio
```
GET /portfolio
```

#### Get Portfolio Holdings
```
GET /portfolio/holdings
```

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2025-01-01T00:00:00Z"
}
```

## Error Handling

Error responses include appropriate HTTP status codes and error messages:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2025-01-01T00:00:00Z"
}
```

## Rate Limiting

API requests are limited to 1000 requests per hour per API key.

## Status Codes

- `200 OK` - Successful request
- `201 Created` - Resource created
- `400 Bad Request` - Invalid parameters
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Access denied
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

## Webhooks

Webhooks can be configured to receive real-time notifications for:
- Transaction confirmations
- Portfolio changes
- Price alerts
- Compliance events

## SDKs

SDKs are available for:
- JavaScript/Node.js
- Python
- Go
- Java
