express  = require "express"
sio      = require "socket.io"

io = sio.listen 8444

io.sockets.on "connection", (socket) ->
    console.log socket.id
    socket.emit "sID", socket.id
