const express = require("express")
const { createServer } = require("node:http");
const path = require("node:path");
const { join } = require("node:path");
const { disconnect } = require("node:process");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server)

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"))
})

io.on("connection", (socket) => {
    console.log("user connected!!")
    // broadcast - 접속한 모든 사용자들에게 메세지 emit
    socket.broadcast.emit("hi")

    socket.on("chatMsg", (msg) => {
        // chatMsg 이벤트 수신메세지
        io.emit("chatMsg", msg)
        console.log(`message : ${msg}`)
    })
})

server.listen(3000, () => {
    console.log("server running at http://localhost:3000")
})