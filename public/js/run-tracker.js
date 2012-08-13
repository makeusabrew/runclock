var RunTracker = (function() {
    var map       = null,
        marker    = null,
        runTime   = 0,
        timeHandler = null,
        timer     = null,
        listeners = {},

        that = {};

    that.init = function(options) {
        var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            draggable: false
        };

        map = new google.maps.Map(
            document.getElementById(options.map),
            mapOptions
        );
        
        marker = new google.maps.Marker({
            map: map
        });

        timer = options.timer;
    };

    that.setStartPosition = function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            that.setMapPosition(position);
        }, function(err) {
            that.emit("position:error", err);
        }, {
            enableHighAccuracy: true
        });
    };

    that.watchPosition = function() {
        navigator.geolocation.watchPosition(function(position) {
            that.emit("position:change", position);
        }, function(err) {
            that.emit("position:error", err);
        }, {
            enableHighAccuracy: true
        });
    };

    that.updatePosition = function(position) {
        that.setMapPosition(position);
    };

    that.setMapPosition = function(position) {
        var latLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
        );

        marker.setPosition(latLng);
        map.setCenter(latLng);
    };

    that.startTimer = function() {
        // do I like having the timer stuff all embedded in RunTracker like this?
        // not really... worth thinking about
        timeHandler = setInterval(function() {
            runTime ++;
            $(timer).html(runTime);
        }, 1000);
    };
    
    that.emit = function(msg, data) {
        if (!listeners[msg]) {
            return false;
        }

        var _listeners = listeners[msg];

        for (var i = 0, j = _listeners.length; i < j; i++) {
            var listener = _listeners[i];

            listener.call(that, data);
        }
    };

    that.on = function(msg, cb) {
        if (!listeners[msg]) {
            listeners[msg] = [];
        }

        listeners[msg].push(cb);
    };

    return that;
}());
