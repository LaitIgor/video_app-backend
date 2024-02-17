import { createError } from "../error.js"
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.user.id, {
                $set: req.body
            },
            {new: true})
            res.status(200).json(updatedUser)

        } catch(err) {
            next(err);
        }
    } else {
        return next(createError(403, 'You can update only your account'))
    }
}

export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json('User has been deleted');

        } catch(err) {
            next(err);
        }
    } else {
        return next(createError(403, 'You can delete only your account'))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findByI(req.params.id);
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }

}

export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        })
        res.status(200).json("Subscription successful")
    } catch(err) {
        next(err);
    }
}

export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
        })
        res.status(200).json("Usubscription successful")
    } catch(err) {
        next(err);
    }
}

export const like = async (req, res, next) => {
    try {
        
    } catch(err) {
        next(err);
    }
}

export const dislike = async (req, res, next) => {
    try {
        
    } catch(err) {
        next(err);
    }
}

// {
//     "name": "test",
//     "email": "testemail.com",
//     "password": "password123"
// }