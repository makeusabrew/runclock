express  = require "express"
sio      = require "socket.io"
mysql    = require "mysql"

io = sio.listen 8444

connection = mysql.createConnection({
    host: "localhost",
    user: "runclock_build",
    database: "runclock_build",
    password:"HyPftJvPYAGLaAzF" # @todo from config, please
})

io.sockets.on "connection", (socket) ->
    socket.emit "sID", socket.id

    socket.on "position:change", (position) ->
        console.log position

        connection.query "INSERT INTO `positions` (latitude, longitude) VALUES(?,?)", [position.coords.latitude, position.coords.longitude], (err, results) ->
            console.log err, results
