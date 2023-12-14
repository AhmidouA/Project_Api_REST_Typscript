import mongoose from "mongoose";

let MONGO_URL = process.env.MONGODB;

mongoose.Promise = Promise;
mongoose
.connect(MONGO_URL!) // Never null
    .then(() => console.log("Connected Successfully"))
    .catch((err) => console.error("Not Connected to mongoDb", err));