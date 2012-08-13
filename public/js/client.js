var Client = (function() {
    var io     = null,
        socket = null,
        id     = null,
        that   = {};

    that.init = function(options) {
        io = options.io;

        socket = io.connect(options.host);

        socket.on("sID", function(sID) {
            console.log(sID);
            id = sID;
            // @todo XHR to Apache to claim the ID
        });
    };

    that.emit = function(msg, data) {
        socket.emit(msg, data);
    };

    that.on = function(msg, cb) {
        socket.on(msg, cb);
    };

    return that;
}());
