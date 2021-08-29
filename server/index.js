const express = require("express")
const app = express();
const cors = require("cors")
const _http = require("http")

const { Server } = require("socket.io")

app.use(cors());

const server = _http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    // console.log(`User connected ${socket.id}`)

    socket.on("join_room", (room_id) => {
        socket.join(room_id)
        console.log("get room id from frontend "+room_id)
    })

    socket.on("disconnect", () => {
        console.log(`This socketId: ${socket.id} user is diconnected!`)
    })
})

let port = 8080 || process.env.PORT
server.listen(port, () => console.log(`🚀 Server is running on http://localhost:${port}`))