const express = require("express")
const app = express();
const cors = require("cors")
const _http = require("http")

require('dotenv').config()

const { uuid } = require('uuidv4');
const stripe = require('stripe')(process.env.SECRET_KEY)

const { Server } = require("socket.io")

app.use(cors());

const server = _http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

app.post("/payment", (req, res) => {
    const { payment, token } = req.body;
    const id = uuid()
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: payment * 100,
            currency: "PKR",
            customer: customer.id,
            receipt_email: token.email,
            description: `Payment subscription for chat perimum feature`
        }, id)
    }).then(result => {
        res.status(200).json({
            message: "Payment Succeed",
            data: result
        })
    })
        .catch(e => console.log(e))

})

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`)

    socket.on("join_room", (room_id) => {
        socket.join(room_id)
        console.log("get room id from frontend " + room_id)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log(`This socketId: ${socket.id} user is diconnected!`)
    })
})

let port = 8000 || process.env.PORT
server.listen(port, () => console.log(`🚀 Server is running on http://localhost:${port}`))