import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config({path: './config/dev.env'});

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}, (error) => {
    console.log('Error connecting to MongoDB', error);
});