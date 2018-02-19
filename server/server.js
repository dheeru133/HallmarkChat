/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-15 23:59:37 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-19 10:17:47
 */
// Express application configuration
const path = require('path');
const env = require('./config/config');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const app = express();
const httpSerevr = http.createServer(app);
const io = socketIO(httpSerevr);
var users = new Users();
const port = process.env.PORT;
httpSerevr.listen(port, () => {
    console.log('App running on PORT : ', port);
});

//Middleware
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

//#######################IO###########################
// Connection to Client
io.on('connection', (socket) => {
    console.log('New User "---CONNECTED---" from client');

    // Liten Custom event - Geolocation
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    // Liten Custom event - Join Room -Socket Join.Emit to specific users
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room name are Required !!');
        }
        socket.join(params.room);
        //Remove users from previous chat room
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // Emit Custom event - Socket.emit only send to one client connection
        //USER Join Welcome Message
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Hallmark Chat App'));

        // ALL User notified who joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });

    // Liten Custom event and EMIT to everyone
    socket.on('createMessage', (message, callback) => {
        // Emit Custom event -  IO.emit  send to all client connection. Including self client
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();

    });


    // Disconnect from Client
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });

});