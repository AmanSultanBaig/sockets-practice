// console.log("Welcome to Sockets programming")
const express = require("express")
const app = express();
const cors = require("cors")
const _http = require("http")

app.use(cors());

const server = _http.createServer(app);

let port = 8080 || process.env.PORT 
server.listen(port, () => console.log(`Server is running on http://localhost:${port}`))