const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')

const PORT = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
var io = socketio(server);

var userCount = 0

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {

  // User connected
  userCount += 1
  io.emit('new user count', userCount)
  console.log(`${userCount} users`)

  // New post
  socket.on('new post', (title, body) => {
    var time = new Date();
    io.emit('new post', title, body, time)
  })
  
  // User disconnected
  socket.on('disconnect', () => {
    userCount -= 1
    io.emit('new user count', userCount)
    console.log(`${userCount} users`)
  })

});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})