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
    console.log(socket.id)

    io.on("disconnect", () => console.log(`This socketIs: ${socket.id} user is diconnected!`))
})

let port = 8080 || process.env.PORT
server.listen(port, () => console.log(`🚀 Server is running on http://localhost:${port}`))