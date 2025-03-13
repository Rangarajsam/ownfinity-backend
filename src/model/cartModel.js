import mongoose from "mongoose";
import { type } from "os";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            },
            productDetails:{
                productName: {
                    type:String,
                    required:true
                },
                availableItems:{
                    type:Number,
                    required:true
                },
                price:{
                    type:Number,
                    required:true
                }
            }
        }
    ],
    expiresAt:{
        type:Date,
        default:() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
},
{
    timestamps:true
})

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;