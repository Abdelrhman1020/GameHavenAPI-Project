# 🎮 GameHaven REST API

![Node.js](https://img.shields.io/badge/Node.js-v22.16.0-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-v4.18.2-blue?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-v7.0.2-brightgreen?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow?logo=github)
![Project Status](https://img.shields.io/badge/Status-Complete-brightgreen)

Welcome to **GameHaven**, a modern and robust RESTful API for a fictional video game marketplace! 🕹️ Built as the capstone project for the **Node.js Fundamentals** course (May 2025, Instructor: Eng. Ahmed Edrees), this API powers a digital store with user authentication, game management, shopping carts, orders, and extra features like reviews, categories, and wishlists. 🌟

Developed with **Node.js**, **Express**, and **MongoDB**, GameHaven showcases best practices like **MVC + Service Layer** architecture, **JWT** authentication, **Multer** file uploads, and comprehensive testing. Whether you’re a gamer, a dev, or just curious, dive into GameHaven and explore the code! 🚀

## 📖 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Setup & Installation](#-setup--installation)
- [🌐 API Endpoints](#-api-endpoints)
- [🧪 Testing](#-testing)
- [🏛️ Architecture](#-architecture)
- [🔧 Environment Variables](#-environment-variables)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)

## ✨ Features
- **🔒 Secure Authentication**: User registration and login with JWT and bcrypt password hashing.
- **🎲 Game Catalog**: Browse, filter, and view games with pagination and search.
- **🛠️ Admin Controls**: Create, update, and delete games (admin-only) with image uploads.
- **🛒 Shopping Cart**: Add, update, and view cart items with real-time stock validation.
- **📦 Orders**: Place orders, deduct stock, clear cart, and view order history.
- **🖼️ File Uploads**: Upload game cover images using Multer.
- **⭐ Extra Features (Bonus)**:
  - **Reviews**: Rate and comment on games (one review per user per game).
  - **Categories**: Organize and filter games by category.
  - **Wishlist**: Bookmark games for later purchase.
- **🛡️ Security**: Input validation with `express-validator`, role-based access (user/admin).
- **🧪 Testing**: Unit and integration tests with Vitest and Supertest.
- **📚 Documentation**: Detailed setup guide and API documentation.

## 🛠️ Tech Stack
| Technology         | Purpose                              |
|--------------------|--------------------------------------|
| **Node.js**        | Backend runtime                      |
| **Express.js**     | Web framework for API                |
| **MongoDB**        | NoSQL database                       |
| **Mongoose**       | ODM for MongoDB                      |
| **JWT**            | Authentication tokens                |
| **bcrypt**         | Password hashing                     |
| **Multer**         | File uploads                         |
| **express-validator** | Input validation                   |
| **Morgan**         | HTTP request logging                 |
| **dotenv**         | Environment variable management      |
| **Vitest**         | Testing framework                    |
| **Supertest**      | API testing                          |
| **Nodemon**        | Development hot reload               |

## 📂 Project Structure
``` bash
gamehaven-api/
├── src/                            # Source code for the API
│   ├── config/                     # Configuration files
│   │   ├── db.js                   # MongoDB connection setup
│   │   └── env.js                  # Environment variable parsing
│   ├── controllers/                # Request handlers (MVC Controllers)
│   │   ├── auth.controller.js      # User registration, login
│   │   ├── game.controller.js      # Game CRUD and catalog operations
│   │   ├── cart.controller.js      # Shopping cart management
│   │   ├── order.controller.js     # Order placement and history
│   │   ├── review.controller.js    # Game reviews (optional)
│   │   ├── category.controller.js  # Game categories (optional)
│   │   └── wishlist.controller.js  # User wishlist (optional)
│   ├── middleware/                 # Custom middleware
│   │   ├── auth.middleware.js      # JWT authentication and role-based access
│   │   ├── error.middleware.js     # Global error handling
│   │   ├── validation.middleware.js # Input validation with express-validator
│   │   └── logger.middleware.js    # Custom request logging
│   ├── models/                     # Mongoose schemas (MVC Models)
│   │   ├── User.model.js           # User schema
│   │   ├── Game.model.js           # Game schema
│   │   ├── Cart.model.js           # Cart schema
│   │   ├── Order.model.js          # Order schema
│   │   ├── Review.model.js         # Review schema (optional)
│   │   ├── Category.model.js       # Category schema (optional)
│   │   └── Wishlist.model.js       # Wishlist schema (optional)
│   ├── routes/                     # API routes
│   │   ├── auth.routes.js          # /api/auth (register, login)
│   │   ├── game.routes.js          # /api/games (CRUD, filtering)
│   │   ├── cart.routes.js          # /api/cart (add, view, update)
│   │   ├── order.routes.js         # /api/orders (place, history)
│   │   ├── review.routes.js        # /api/reviews (optional)
│   │   ├── category.routes.js      # /api/categories (optional)
│   │   └── wishlist.routes.js      # /api/wishlist (optional)
│   ├── services/                   # Business logic (Service Layer)
│   │   ├── auth.service.js         # Authentication logic
│   │   ├── game.service.js         # Game management logic
│   │   ├── cart.service.js         # Cart operations
│   │   ├── order.service.js        # Order processing
│   │   ├── review.service.js       # Review logic (optional)
│   │   ├── category.service.js     # Category logic (optional)
│   │   └── wishlist.service.js     # Wishlist logic (optional)
│   ├── uploads/                    # Directory for game cover images
│   └── app.js                      # Express app setup and server initialization
├── tests/                          # Test files
│   ├── auth.test.js                # Auth endpoint tests
│   ├── game.test.js                # Game endpoint tests
│   ├── cart.test.js                # Cart endpoint tests
│   ├── order.test.js               # Order endpoint tests
│   ├── review.test.js              # Review endpoint tests (optional)
│   ├── category.test.js            # Category endpoint tests (optional)
│   ├── wishlist.test.js            # Wishlist endpoint tests (optional)
│   └── setup.js                    # Test setup (e.g., MongoDB Memory Server)
├── .env                            # Environment variables (not committed)
├── .env.example                    # Example environment variables
├── .gitignore                      # Files/directories to ignore in Git
├── package.json                    # Project dependencies and scripts
├── README.md                       # Project documentation (this file)
└── swagger.yaml                    # API documentation with Swagger (optional)
```

## 🚀 Setup & Installation
Get GameHaven running locally in a few simple steps! 🛠️

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/BasantElsaey/GameHavenAPI-Project
   cd gamehaven-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
  
3. **Configure Environment Variables**:
   - Copy the `.env.example` file and rename it to `.env`.
   ```bash
   cp .env.example .env
   ```
   
   -Edit .env with your settings:
   ```bash
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   PORT=<your-port-number>
   ```

4. **Start the Server**:
   ```bash
   npm start
   ```

5. **Access the API**:
   - Open your web browser and navigate to `http://localhost:${PORT}` to access the GameHaven API.


## 🌐 API Endpoints
GameHaven provides a range of endpoints to manage users, games, carts, orders, reviews, categories, and wishlists. Here's a summary of the available endpoints:
All endpoints return JSON. Authentication requires a Bearer token in the Authorization header for protected routes.

### 🔑 Auth

| Method | Endpoint | Description | Auth Required 
|--------|----------|-------------|---------------
| POST   | /api/auth/register | Register a new user | No
| POST   | /api/auth/login    | User login | No

### 🎮 Games

| Method | Endpoint | Description | Auth Required
|--------|----------|-------------|---------------
| GET    | /api/games | Get all games | No
| GET    | /api/games/:id | Get a specific game by ID | No
| POST   | /api/games | Create a new game | Admin
| PUT    | /api/games/:id | Update a game by ID | Admin
| DELETE | /api/games/:id | Delete a game by ID | Admin

#### 🔍 Query Parameters for GET /api/games:

- page (e.g., ?page=1)
- limit (e.g., ?limit=10)
- genre (e.g., ?genre=action)
- platform (e.g., ?platform=PC)
- search (e.g., ?search=mario)

### 🛒 Cart

| Method | Endpoint | Description | Auth Required
|--------|----------|-------------|---------------
| GET    | /api/cart | View the user's cart | User(JWT)
| POST   | /api/cart | Add a game to the cart | User(JWT)
| PUT    | /api/cart/:gameId | Update the cart item quantity | User(JWT)
| DELETE | /api/cart/:gameId | Remove item from the cart | User(JWT)

### 📦 Orders

| Method | Endpoint | Description | Auth Required
|--------|----------|-------------|---------------
| POST   | /api/orders | Place an order | User(JWT) 
| GET    | /api/orders | Get the user's order history | User(JWT)

### ⭐ Reviews(Optional)

| Method | Endpoint | Description | Auth Required
|--------|----------|-------------|---------------
| GET    | /api/reviews/:gameId | Get reviews for a specific game | No
| POST   | /api/reviews/:gameId | Add a review for a game | User(JWT)

### 📂 Categories(Optional)

| Method | Endpoint | Description | Auth Required
|--------|----------|-------------|---------------
| GET    | /api/categories | Get all categories | No
| POST   | /api/categories | Create a new category | Admin (JWT)

### 🤍 Wishlists(Optional)

| Method | Endpoint | Description | Auth Required
|--------|----------|-------------|---------------
| GET    | /api/wishlists | Get the user's wishlist | User(JWT)
| POST   | /api/wishlists | Add a game to the wishlist | User(JWT)
| DELETE | /api/wishlists/:gameId | Remove a game from the wishlist | User(JWT)

#### 📝 Note: 
- Full API documentation is available in swagger.yaml (optional). Import it into Swagger UI for an interactive experience.


## 🧪 Testing

The project includes unit and integration tests to ensure reliability. 🛡️

- Framework: Vitest with Supertest for API testing.

- Mocking: MongoDB Memory Server for database mocking.

- Coverage: Tests for auth, games, cart, orders, and optional features.

### Run Tests
```bash
npm test
```

## 🏛️ Architecture
GameHaven follows the MVC + Service Layer pattern for clean and maintainable code:

- Models: Mongoose schemas (User, Game, Cart, etc.) define data structures.

- Views: N/A (REST API returns JSON).

- Controllers: Handle HTTP requests and responses (auth.controller.js).

- Services: Encapsulate business logic (auth.service.js).

- Middleware: Manages auth (auth.middleware.js), validation, logging, and errors.

- Routes: Map endpoints to controllers (auth.routes.js).

#### 🌟 Key Practices:
------------------------------------------------------------
- Separation of Concerns: Controllers are thin, services handle logic.

- Security: JWT for auth, bcrypt for passwords, express-validator for inputs.

- Error Handling: Global middleware catches and formats errors.

- File Uploads: Multer stores game cover images in src/uploads.

## 🔧 Environment Variables
Create a .env file based on .env.example:

```bash
MONGODB_URI=mongodb://localhost:27017/gamehaven
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

- MONGODB_URI: MongoDB connection string.

- JWT_SECRET: Secret key for JWT signing.

- PORT: Server port (default: 3000).

## 🤝 Contributing
Contributions are welcome! 🙌 Follow these steps:

- Fork the repository.

- Create a feature branch (git checkout -b feature/awesome-feature).

- Commit changes (git commit -m 'Add awesome feature').

- Push to the branch (git push origin feature/awesome-feature).

- Open a Pull Request.

- Please adhere to the Code of Conduct.

## 📜 License
This project is licensed under the MIT License. Feel free to use, modify, and distribute! 🗳️

## 🙌 Acknowledgments

- Eng. Ahmed Edrees: For guiding the Node.js Fundamentals course.

- Node.js Community: For awesome tools and libraries.

- You: For checking out GameHaven! 😄

#### 🎉 Happy Gaming! 🎮 Built with 💖 for the Node.js Fundamentals Capstone, May 2025.
