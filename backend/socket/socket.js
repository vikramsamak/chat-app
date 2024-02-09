import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
})

export const getReciverSocketID = (receiverid) => {
    return userSocketMap[receiverid];
}

const userSocketMap = {}

io.on("connection", (socket) => {
    

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id
    }

    io.emit("getOnlineUser", Object.keys(userSocketMap));

    // on method for listening events on server and client side
    socket.on("disconnect", () => {
        
        delete userSocketMap[userId];
        io.emit("getOnlineUser", Object.keys(userSocketMap));
    })
})

export { app, io, server }