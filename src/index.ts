import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from 'dotenv';
import router from './router'

//db
import "../config/db"

// detenv
dotenv.config({ path: 'config/.env' });


const app = express();

app.use(cors({
    credentials: true
}));


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

app.use('/', router())

server.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});





