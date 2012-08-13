var RunTracker = (function() {
    var map       = null,
        marker    = null,
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
    };

    that.setStartPosition = function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            that.setMapPosition(position);
        }, function(err) {
            console.log(err);
        }, {
            enableHighAccuracy: true
        });
    };

    that.watchPosition = function() {
        navigator.geolocation.watchPosition(function(position) {
            that.emit("position:change", position);
        }, function(err) {
            //
            console.log(err);
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
