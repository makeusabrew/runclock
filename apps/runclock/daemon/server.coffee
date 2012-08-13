express  = require "express"
sio      = require "socket.io"
mysql    = require "mysql"
redis    = require("redis").createClient()

io = sio.listen 8444

connection = mysql.createConnection({
    host: "localhost",
    user: "runclock_build",
    database: "runclock_build",
    password:"HyPftJvPYAGLaAzF" # @todo from config, please
})

io.sockets.on "connection", (socket) ->
    # create a new redis var we can associate with a PHP session ID
    redis.set "sockets:socket:#{socket.id}", "unclaimed", ->
        socket.emit "sID", socket.id


    ###
    # request a new activity -> add to db -> emit new ID
    ###
    socket.on "activity:start", ->
        connection.query "INSERT INTO `activities` (created, updated) VALUES(?, ?)", [new Date(), new Date()], (err, result) ->
            packet =
                id: result.insertId

            socket._runId = result.insertId

            socket.emit "activity:start", packet

    socket.on "position:change", (data) ->

        return if socket._runId != data.id

        coords = data.position.coords

        connection.query "INSERT INTO `positions` (activity_id, latitude, longitude, created, updated) VALUES(?,?,?,?,?)", [data.id, coords.latitude, coords.longitude, new Date(), new Date()], (err, result) ->
            # hurrah
