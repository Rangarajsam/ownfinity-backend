

import express from 'express';
import userRouter from './router/userRouter.js';
import productRouter from './router/productRouter.js'
import cartRouter from './router/cartRouter.js';
import './db/mongoose.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});