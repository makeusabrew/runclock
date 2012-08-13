var Trail = function(options) {
    this.points = [];
    this.marker = null;
    this.map = null;
    this.line = null;
    this.runId = null;

    this.map = options.map;
    this.line = new google.maps.Polyline();

    this.line.setMap(this.map);

    this.marker = new google.maps.Marker({
        map: this.map
    });

    this.runId = options.id;

    this.addPoint(options.position);
}

Trail.prototype.addPoint = function(position) {
    this.points.push(position);

    var latLng = new google.maps.LatLng(
        position.latitude,
        position.longitude
    );

    var path = this.line.getPath();

    path.push(latLng);

    this.marker.setPosition(latLng);
}
