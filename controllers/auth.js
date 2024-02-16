import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const password = req.body.password;
        const hashedPass = bcrypt.hashSync(password, 12);
        const newUser = new User({...req.body, password: hashedPass});
        await newUser.save();
        return res.status(200).send('User has been created');

    } catch(err) {
        next(err);
    }
}


export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({name: req.body.name});
        if (!user) return next(createError(404, 'User not found'));
        const isCorrectPass = await bcrypt.compare(req.body.password, user.password);
        console.log(isCorrectPass,333);
        
        if (!isCorrectPass) return next(createError(400, 'Wrong credentials'));
        
        const token = jwt.sign(
            {
                email: user.email, 
                id: user._id.toString(),
            }, 
            process.env.JWT,
            { expiresIn: '1h' }
        );

        const { password, ...other } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)

    } catch(err) {
        next(err);
    }
}

// {
//     "name": "test",
//     "email": "testemail.com",
//     "password": "password123"
// }