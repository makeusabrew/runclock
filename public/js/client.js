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
        });
    };

    return that;
}());
