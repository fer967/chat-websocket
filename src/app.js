import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
    res.render("index");
})

const httpServer = app.listen(PORT, () => {
    console.log(`servidor en http://localhost:${PORT}`);
})

const io = new Server(httpServer);

// array para guardar historial de mensajes
let messages = [];

io.on("connection", (socket) => {
    socket.on("message", data => {
        messages.push(data);
        io.emit("messagesLogs", messages);
    })
})