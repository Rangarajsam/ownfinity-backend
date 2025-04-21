

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../config/dev.env') });
import express from 'express';
import userRouter from './router/userRouter.js';
import productRouter from './router/productRouter.js'
import cartRouter from './router/cartRouter.js';
import wishListRouter from './router/wishListRouter.js';
import s3Router from './router/s3Router.js';
import cors from "cors";

const corsOptions = {
  origin: [
    "http://localhost:3000", 
    'http://ownfinity.rangarajexplore.in',
    'https://ownfinity.rangarajexplore.in'
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

import './db/mongoose.js';

const app = express();
const port = process.env.PORT;

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(wishListRouter);
app.use(s3Router);
app.get("/", (req, res) => {
  res.send("Ownfinity API is up and running 🚀");
});
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is up on port ${port}`);
});