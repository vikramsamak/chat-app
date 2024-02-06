import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import connectToMongoDb from "./db/connectToMongoDb.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json())

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Chat App!")
})


app.listen(PORT, () => {
    connectToMongoDb();
    console.log("Server is listenin on port", PORT);
})