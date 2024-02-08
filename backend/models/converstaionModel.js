import mongoose from "mongoose";

const converstionSchema = mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: {}
        }
    ]
}, { timestamps: true })

const ConverstionModel = mongoose.model("Conversation", converstionSchema)

export default ConverstionModel;