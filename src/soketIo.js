const socket = require('socket.io')
const io = socket()

const socketApi = {};
socketApi.io = io

const users = []

io.on('connection' , (socket)=>{
    console.log('foydalanuvchi salom');

    socket.on('newUser' , (data)=>{
      const defoultData = {
        id: socket.id,
        position:{
          x:0,
          y:0
        }
      }
      const userData = Object.assign(data,defoultData)
      // console.log(userData);
      users.push(userData)

      socket.broadcast.emit('newUsername' , userData)
    })

})

module.exports = socketApi