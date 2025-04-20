import mongoose from "mongoose";
import validator from "validator";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 100,
        required: true
    },
    category: {
        type: String,
        maxLength: 50,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    numReview: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0,
        required: true
    },
    reviews: [reviewSchema],
    images: [
        {
            type: String,
        }
    ]
},
    {
        timestamps: true
    })

const Product = mongoose.model('Product', productSchema);

export default Product;