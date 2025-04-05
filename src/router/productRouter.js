import express from 'express';
const router = express.Router();
import auth from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';
import Product from '../model/productModel.js';

router.post('/products', auth, admin, async(req, res) => {
    const staticCategories = [
        "Electronics",
        "Fashion",
        "Home & Furniture",
        "Grocery",
        "Beauty & Health",
        "Sports & Fitness",
        "Automotive",
        "Books & Stationery",
        "Baby & Kids",
        "Handmade & Craft"
    ]
    try{
        if(!staticCategories.includes(req.body.category)) {
            return res.status(403).send('This category is not available')
        }
        const product = new Product({
            seller : req.user._id,
            ...req.body
        });
        await product.save();
        res.status(201).send(product);
    } catch(e) {
        res.status(400).send(e);
    }
})

router.patch('/products/:id', auth, admin, async(req, res) => {
    const requestedValuesToEdit = Object.keys(req.body);
    const allowedKeysToEdit = ["name","category","price","stock","description","brand"]
    requestedValuesToEdit.forEach((v) => {
        if(!allowedKeysToEdit.includes(v)) {
           return res.status(400).send(`${v} is not alllowed to update`)
        }
    })
    try {
        const product = await Product.findOne({_id:req.params.id,seller:req.user._id})
        requestedValuesToEdit.forEach(v => {
            product[v] = req.body[v]
        })
        product.save();
        res.send(product);
        
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/products/:id', auth, admin, async(req, res) => {
    try {
        const product = await Product.findOneAndDelete({_id:req.params.id, seller:req.user._id})
        if(!product) {
            return res.status(400).send();
        }
        res.send(product);
        
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/products', auth, admin, async(req,res) => {
    try{
        const products = await Product.find({});
        res.send(products);

    }catch(e) {
        res.status(400).send(e);
    }
})

router.get('/myProducts', auth, async(req,res) => {
    try{
        const products = await Product.find({seller:req.user._id});
        res.send(products);

    }catch(e) {
        res.status(400).send(e);
    }
})

export default router;