import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MONGO_DB_URI }  from './dbKeys.js'

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

app.listen(8000, () => {
    connect();
    console.log('Connected to server!');
})