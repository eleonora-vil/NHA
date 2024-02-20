import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors'
import cookies from 'cookie-parser';
dotenv.config();

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectToMongoDB from './db/connecToMongoDB.js';

import { app, server } from './socket/socket.js'

const PORT = process.env.PORT || 5000

const __dirname = path.resolve();

app.use(
    cors({
        credentials: true,
        allowedHeaders: "Content-Type,Authorization",
        origin: process.env.CLIENT_URL ?? "http://localhost:5173",
    })
);
app.use(cookies());

app.use(bodyParser.json());
// Parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send('Hello World')
})

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/user", userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
})
