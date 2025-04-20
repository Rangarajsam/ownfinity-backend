import express from 'express';
import auth from '../middleware/authMiddleware.js';
import WishList from '../model/wishListModel.js';

const router = express.Router();


router.post('/wishlist/add', auth, async(req, res) => {
    const productId = req.body.productId;
    try {
        let wishList = await WishList.findOne({user:req.user._id});
        if(!wishList) {
            wishList = new WishList({user:req.user._id, items:[]});
        }
        const isAlreadyinWishlist = wishList.items.some(w => w.product.toString() === productId)
        if(isAlreadyinWishlist) {
            return res.status(400).send({message:"This item is already available in wishlist"})
        }
        wishList.items.push({product:productId})
        await wishList.save();
        res.send({message:"wishlist added successfully"})
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/wishlist', auth, async(req, res) => {
    try {
        const wishList = await WishList.findOne({user:req.user._id}).populate({
            path:'items.product',
            select:'name price description images'
        })
        if(!wishList) {
            return res.status(400).send({message:"There are no items found in your wishlist"});
        }
        res.send(wishList)
        
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/wishlist/remove/:productId', auth, async(req, res) => {
    const productId = req.params.productId;
    try {
        const wishList = await WishList.findOne({user:req.user._id});
        if(!wishList) {
            return res.status(400).send({message:"Wishlist not found"});
        }
        let itemIndex = wishList.items.findIndex(w => w.product.toString() === productId);
        if(itemIndex === -1) {
            return res.status(400).send({message:"This product is not in your wislist"});
        }
        wishList.items.splice(itemIndex, 1);
        if(wishList.items.length === 0) {
            await WishList.findByIdAndDelete(wishList._id);
            return res.send({removedProductId:productId,message:"Last item removed. so, Wishlist deleted"});
        }
        await wishList.save();
        res.send({removedProductId:productId,message:"item removed from wishlist"})

    } catch (e) {
        res.status(400).send(e)
    }
})

export default router;