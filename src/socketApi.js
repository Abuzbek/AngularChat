const socketio = require('socket.io');  // Socket IO  Bekend qismida Ishlavomiz  
const randomColors = require('../helper/randomColor');

const io = socketio();

const socketApi = {};
socketApi.io = io

const users = { }

io.on("connection", (socket) => {
    console.log("Foydalanuvchi bog'landi");
    socket.emit("randomColor", randomColors())
    socket.on("newUser", (data) => {
        // console.log(data);
        const defoultData = {
            id: socket.id,
            color: randomColors()
        };
        const userData = Object.assign(data, defoultData)

        users[socket.id] = userData
        console.log(users);
        socket.broadcast.emit("newUser", users[socket.id] ) 

        socket.emit("initPlayers", users)


        socket.on('disconnect', () => {
            socket.broadcast.emit("disUser", users[socket.id])
            // console.log(users);
            delete users[socket.id]
            // console.log(users);
        })
       
        
    })
    
    socket.on("newMessage", data => {
        // console.log(data);
        socket.broadcast.emit("newMessage", data)
    }) 
})


module.exports = socketApi

