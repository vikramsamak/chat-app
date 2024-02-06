import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import generatejwtToken from "../utils/genrateJWTToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password dont match" })
        }

        const user = await UserModel.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }

        // Password hashing

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new UserModel({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "Male" ? boyProfile : girlProfile
        })

        if (newUser) {
            await newUser.save();
            // Generating jwt token 
            generatejwtToken(newUser._id, res)
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        }
        else {
            return res.status(400).json({ error: "Invalid user data" })
        }
    }
    catch (error) {
        console.log("Error sign up:", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username })

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid credientials" })
        }

        generatejwtToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error login:", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwtToken", "", {
            maxAge: 0
        })
        res.status(200).json({ message: "Logged out sucessfully" })

    } catch (error) {
        console.log("Error logout:", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}