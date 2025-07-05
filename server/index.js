const express = require('express');
const socket = require('socket.io');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); // used to send info from front-end to back-end


const server = app.listen('3002', () => {
    console.log('Server running on Port 3002');

});

// io = socket(server);
io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Credentials'],
        withCredentials: true
    }
})

io.on('connection', (socket) => {
    console.log("New client connected (server side): ", socket.id);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log('user has join the room:' + data);
    });

    socket.on('disconnect', () => {
        console.log("USER DISCONNECTED");
    });
});