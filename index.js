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
})

server.listen(3000, () => {
    console.log("server running at http://localhost:3000")
})