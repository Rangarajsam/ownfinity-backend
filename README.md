An Ecommerce application using expressJS, MongoDB from backend and React, NextJS, Tailwind from frontend
# Ecommerce Backend

This is the backend for an ecommerce application (ownfinity) built using **Express.js** and **MongoDB**. It provides RESTful APIs for managing users, products, carts, wishlists, and file uploads to AWS S3. The frontend is built using **React**, **Next.js**, and **Tailwind CSS**.

## Features

- User authentication and authorization using **JWT**.
- Product management for sellers.
- Cart and wishlist management for customers.
- Secure file uploads to **AWS S3** with signed URLs.
- Middleware for role-based access control.
- MongoDB integration using **Mongoose**.

## Project Structure
```
ownfinity-backend/
├── .gitignore
├── .vscode/
│   ├── launch.json
├── config/
│   ├── dev.env
├── package.json
├── pnpm-lock.yaml
├── README.md
├── src/
│   ├── db/
│   │   ├── mongoose.js
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   ├── model/
│   │   ├── cartModel.js
│   │   ├── productModel.js
│   │   ├── userModel.js
│   │   ├── wishListModel.js
│   ├── router/
│   │   ├── cartRouter.js
│   │   ├── productRouter.js
│   │   ├── s3Router.js
│   │   ├── userRouter.js
│   │   ├── wishListRouter.js
│   ├── server.js
│   ├── utils/
│   │   ├── cartUtils.js
```

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd ownfinity-backend

2. Install dependencies:
npm install

3. Create a .env file in the config/ directory and add the following environment variables: 
```
PORT=1234
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```

4. Start the server:
npm start

## Scripts
```
Start the server: pnpm start
Debug the server: pnpm run debug
```

## Dependencies
```
Express.js: Web framework.
Mongoose: MongoDB object modeling.
AWS SDK: For S3 integration.
jsonwebtoken: For authentication.
bcryptjs: For password hashing.
dotenv: For environment variable management.
```

## Development
Nodemon: Automatically restarts the server during development.

License
This project is licensed under the ISC License.

