import express from "express"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messagesRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import connectToMongoDb from "./db/connectToMongoDb.js";
import dotenv from "dotenv"

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.get("/", (req, res) => {
    res.send("Chat App!")
})


app.listen(PORT, () => {
    connectToMongoDb();
    console.log("Server is listenin on port", PORT);
})