import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'User'
    },
    items:[{
        productId:{
            type:mongoose.SchemaTypes.ObjectId,
            required:true,
            ref:'Product'
        },
        addedAt:{
            type:Date,
            default:Date.now
        }
    }]
},
{
    timestamps:true
})

const WishList = mongoose.model('WishList', wishListSchema);

export default WishList;