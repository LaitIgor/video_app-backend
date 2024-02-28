import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import videoRoutes from './routes/videos.js';
import authRoutes from './routes/auth.js';

const app = express();
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => {
            console.log('Connected to DB');
        })
        .catch(() => {
            throw new Error('Error while connecting to DB!')
        })
}

app.use((req, res, next) => {
    // Allow cors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// allows our app to send and receive cookies
app.use(cookieParser())
// this call allows app to take JSON requests as body
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/videos", videoRoutes)

// Middleware for handling errors
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    console.log(err, 'errr');
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(8000, () => {
    connect();
    console.log('Connected to server!');
})