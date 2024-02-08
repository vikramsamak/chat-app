import UserModel from "../models/userModel.js";

export const getUsersForSideBar = async (req, res) => {

    try {

        const loggedInUserId = req.user._id;

        const filteredUsers = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log('Getting user for sidebar'.error)
        res.stastus(500).json({ error: "Internal server error" })
    }
}