# E-Pharmacy Backend API

Backend REST API for an e-pharmacy marketplace system.  
Supports authentication, shop management, product catalog, and sales statistics.

---

## Features

### Authentication

- User registration & login
- Session-based authentication (access + refresh tokens)
- HTTP-only cookies for security
- Logout & session refresh

### Shop Management

- Create shop
- Get shop details
- Update shop (owner-only access)

### Product Management

- Add products to shop
- Get all products in a shop
- Get product by ID
- Update product
- Delete product
- Access control per shop owner

### Statistics

- Total products count
- Total revenue (from purchases)
- Total purchases count
- Latest clients activity

### Security

- JWT-like session tokens
- Middleware-based authorization
- Ownership verification (shop/product)
- Input validation (Joi / Celebrate)

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT-style session auth
- bcryptjs
- celebrate (Joi validation)
- cookie-parser
- cors

---

## Project Structure

```
src/
├── controllers/ # Business logic
├── middleware/ # Auth, error handling, access control
├── models/ # MongoDB schemas
├── routes/ # API routes
├── services/ # Auth/session logic
├── validations/ # Joi schemas
├── db/ # MongoDB connection
├── constants/ # Time constants
└── index.js # App entry point
```

## Installation

```bash
git clone https://github.com/your-username/e-pharmacy-back.git
cd e-pharmacy-back
npm install
```

Create Environment Variables file:

```
PORT=3000
MONGO_URL=your_mongodb_connection_string
NODE_ENV=development
```

## API Endpoints

### Auth

POST /api/user/register
POST /api/user/login
POST /api/user/logout
POST /api/user/refresh
GET /api/user/user-info

### Shop

POST /api/shop/create
GET /api/shop/:shopId
PUT /api/shop/:shopId/update

### Products

GET /api/shop/:shopId/product
POST /api/shop/:shopId/product
GET /api/shop/:shopId/product/:productId
PUT /api/shop/:shopId/product/:productId
DELETE /api/shop/:shopId/product/:productId

### Statistics

GET /api/statistics?shopId=...
GET /api/statistics/:userId/goods

## Authentication Flow

1. User logs in
2. Server creates session:

- accessToken (short-lived)
- refreshToken (long-lived)

3. Tokens stored in HTTP-only cookies
4. Middleware validates session on each request

## Key Architecture Decisions

- Middleware-based access control for reusability
- Session storage in MongoDB (not only JWT)
- Separation of concerns (controllers/services/middleware)
- Centralized error handling
- Strict validation layer (Celebrate + Joi)

## Example Business Flow

1. User registers
2. User creates shop
3. Owner adds products
4. Customers buy products (purchase model)
5. Statistics aggregates revenue & activity
