import express from 'express';
import auth from '../middleware/authMiddleware.js';
import Cart from '../model/cartModel.js';
import Product from '../model/productModel.js';
import {saveToCart} from '../utils/cartUtils.js'

const router = express.Router();

router.post('/cart', auth, async (req, res) => {
    try {
        const availableCart = await Cart.findOne({ user: req.user._id });
        const productDetails = await Product.findOne({_id: req.body.productId });

        if (!availableCart) {
            const cart = new Cart({ user: req.user._id, expiresAt: new Date() });
            if (!productDetails) {
                return res.status(400).send("Product not found");
            }
            saveToCart(cart, productDetails, req.body);
            await cart.save();
            res.send(cart);
        }
        else {
            saveToCart(availableCart, productDetails, req.body);
            await availableCart.save();
            res.send(availableCart);
        }

    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/cart/removeItem/:itemId', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        const itemIndex = cart.items.findIndex(i => i._id.equals(req.params.itemId))
        if(itemIndex === -1) {
            return res.status(404).send({message:"Product not fount"});
        }
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.send({id:req.params.itemId,message:"Product removed successfully"});
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/cart/clearCart', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
        if(!cart) {
            return res.status(400).send("Cart not found");
        }
        cart.items = [];
        await cart.save();
        res.send("Cart is successfully cleared");
    } catch (e) {
        res.status(400).send(e);
    }
})

router.patch('/cart/:itemId', auth, async(req, res) => {
    try{
        const requsetedKeys = Object.keys(req.body);
        const allowedKeys = ["quantity"];
        const isItAllowed = requsetedKeys.every(r => allowedKeys.includes(r))
        if(!isItAllowed) {
            return res.status(400).send("Values are not allowed to edit");
        }
        const cart = await Cart.findOne({user:req.user._id})
        if(!cart) {
            return res.status(400).send("Cart not found");
        }
        const itemIndex = cart.items.findIndex(i => i._id.equals(req.params.itemId));
        if(itemIndex === -1) {
            return res.status(404).send({message:"Product not fount"});
        }
        requsetedKeys.forEach(rk => cart.items[itemIndex][rk] = req.body[rk]);
        await cart.save();
        res.send(cart);

    }catch(e) {
        res.status(400).send(e);
    }
})

router.get('/cart', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
        if(!cart) {
            return res.status(200).send({items:[]});
        }
        res.send(cart);

    } catch (e) {
        res.status(400).send(e);
    }
})

export default router;