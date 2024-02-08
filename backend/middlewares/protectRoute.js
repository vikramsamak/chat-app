import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;

        if (!token) {
            return res.status(401).json({ error: "No token provided." })
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        if (!decodedToken) {
            return res.status(401).josn({ error: "Unauthorized token" })
        }

        const user = await UserModel.findById(decodedToken.userId).select("-password")

        if (!user) {
            return res.status(404).json({ error: "User not found." })
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Protetct route error", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

export default protectRoute;