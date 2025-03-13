import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async (email) => {
                if (!validator.isEmail(email)) {
                    throw new Error('Email is invalid');
                }
            },
            message: props => `${props.value} is not a valid email`
        },
        lowercase: true,
        trim: true,
        minLength: 3
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    isAdmin:{
        type:Boolean,
        required:true
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
},
{
    timestamps:true
})

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token =  jwt.sign({_id:user._id}, process.env.JWT_TOKEN);
    user.tokens = user.tokens.concat({token});
    try {
       await user.save();
       return token;
    }catch (e) {
        console.error('save error', e)
    }
}

userSchema.pre('save', async function(next){
    let user = this;
    if(!user.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

const User = mongoose.model('User', userSchema)

export default User;