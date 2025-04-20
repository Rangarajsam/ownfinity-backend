import express from 'express';
import User from '../model/usermodel.js';
import bcrypt from 'bcryptjs';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
           return res.status(400).send(e);
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if(!isPasswordMatching) {
           return res.status(400).send({message:'Password is not matching'});
        }
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/me', auth, async(req, res) => {
    try {
        const user = req.user;
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/allusers', async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    }catch(e) {
        res.status(500).send(e);
    }
});

router.post('/logout', auth, async(req, res) => {
    try {
        const user = req.user;
        user.tokens = user.tokens.filter(t => t.token !== req.token);
        user.save();
        res.send("Logged out Successfully");
    } catch(e){
    res.status(500).send()
}
})

export default router;