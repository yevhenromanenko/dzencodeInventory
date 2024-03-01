const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3003;
app.use(cors());
app.use(express.json({ extended: true }));
app.use(bodyParser.json());

const activeUserIds = new Set();

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    activeUserIds.add(userId);

    io.emit('activeUserIds', Array.from(activeUserIds));

    socket.on('disconnect', () => {

        activeUserIds.delete(userId);

        io.emit('activeUserIds', Array.from(activeUserIds));
    });
});

app.use('/dzencodeapp', require('./routes/routes'));

// const PARAMS = `mongodb://localhost:27017/dzencode`
const PARAMS = `mongodb+srv://romanchernukha494:sezofu44@clusterromance.qwgbeck.mongodb.net/dzencode`


async function start(){

    try {
        await mongoose.connect(PARAMS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.once('open', () => {
            console.log('MongoDB is running');
        });

        server.listen(PORT, () => {
            console.log(`server - PORT: ${PORT}`)
        })

    } catch (err) {
        console.log(err)
    }
}

start();

