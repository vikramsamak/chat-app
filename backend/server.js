import express from "express"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messagesRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import connectToMongoDb from "./db/connectToMongoDb.js";
import dotenv from "dotenv"
import { app, server } from "./socket/socket.js";
import path from "path"

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})


server.listen(PORT, () => {
    connectToMongoDb();
    console.log("Server is listenin on port", PORT);
})