import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    profilePic: {
        type: String,
        default: ""
    }
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;