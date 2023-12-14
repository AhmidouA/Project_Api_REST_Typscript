import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config({ path: 'config/.env' });

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB, { connectTimeoutMS: 30000 }) // Never null // Time to call
    .then(() => console.log("Connected Successfully"))
    .catch((err) => console.error("Not Connected to mongoDb", err));

