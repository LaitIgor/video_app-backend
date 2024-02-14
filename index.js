import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import videoRoutes from './routes/videos.js';

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

app.use("/api/users", userRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/videos", videoRoutes)

app.listen(8000, () => {
    connect();
    console.log('Connected to server!');
})