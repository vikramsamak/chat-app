import express from "express"
import dotenv from "dotenv"

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    res.send("Chat App!");
})

app.get("api/auth/signup", (req, res) => {
    console.log("Signup route");
})

app.get("api/auth/login", (req, res) => {
    console.log("Login route");
})


app.listen(PORT, () => {
    console.log("Server is listenin on port", PORT);
})