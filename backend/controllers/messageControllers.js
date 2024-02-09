import ConverstionModel from "../models/converstaionModel.js";
import MessageModel from "../models/messageModel.js";
import { getReciverSocketID, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let converstaion = await ConverstionModel.findOne({
            participants: { $all: [senderId, receiverId] }
        })


        if (!converstaion) {
            converstaion = await ConverstionModel.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new MessageModel({
            senderId,
            receiverId,
            message
        })

        // Socket io

        if (newMessage) {
            converstaion.messages.push(newMessage._id)
        }

        await Promise.all([converstaion.save(), newMessage.save()])

        const receiverSocketId = getReciverSocketID(receiverId);
        if(receiverSocketId)
        {
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json((newMessage))

    } catch (error) {
        console.log("Send Message", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id

        const conversation = await ConverstionModel.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");


        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages

        res.status(200).json(messages);

    } catch (error) {
        console.log("Get Message", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}