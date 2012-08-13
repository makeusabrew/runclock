var RunTracker = (function() {
    var map       = null,
        runTime   = 0,
        timeHandler = null,
        timer     = null,
        trails    = {},
        _userTrail = "user",
        listeners = {},
        curPos    = null,
        runId     = 0,
        distance  = 0,
        distElem  = null,

        that = {};

    function deg2rad(n) {
        return n * (Math.PI / 180.0);
    }

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

        timer = options.timer;

        distElem = options.distance;
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
        var dist = that.haversine(
            curPos.coords,
            position.coords
        );

        distance += dist;

        $(distElem).html(Math.round(distance * 1000));

        that.setMapPosition(position);

        trails[_userTrail].addPoint(position.coords);
    };

    that.setMapPosition = function(position) {
        var latLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
        );

        map.setCenter(latLng);

        curPos = position;
    };

    that.startTimer = function() {
        // do I like having the timer stuff all embedded in RunTracker like this?
        // not really... worth thinking about
        timeHandler = setInterval(function() {
            runTime ++;
            $(timer).html(runTime);
        }, 1000);
    };

    that.startRun = function(id) {
        runId = id;

        that.startTimer();
        that.watchPosition();
        that.addTrail();
    };

    that.addTrail = function() {
        var trail = new Trail({
            map: map,
            position: curPos.coords,
            id: runId
        });

        trails[_userTrail] = trail;
    };

    that.getData = function() {
        return {
            position: curPos,
            id: runId
        };
    };

    that.haversine = function(from, to) {
        // @see http://www.movable-type.co.uk/scripts/latlong.html
        var R = 6371;
        var latDist = deg2rad(to.latitude - from.latitude);
        var longDist = deg2rad(to.longitude - from.longitude);

        var lat1 = deg2rad(from.latitude);
        var lat2 = deg2rad(to.latitude);

        var a = Math.sin(latDist / 2)  * Math.sin(latDist / 2) +
                Math.sin(longDist / 2) * Math.sin(longDist / 2) *
                Math.cos(lat1) * Math.cos(lat2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
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
