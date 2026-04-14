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
