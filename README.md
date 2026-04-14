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
