import jwt from 'jsonwebtoken';
import User from '../model/usermodel.js';

const auth = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findOne({_id:decoded._id, 'tokens.token':token});
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(400).send("Authentication Failed");
    }
}

export default auth;