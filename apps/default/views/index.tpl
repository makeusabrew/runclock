{extends file="base.tpl"}
{block name="body"}
    <a data-start href=#>start</a>
    <div id=gmap style="width:100%;height:300px">
    </div>
{/block}
{block name="script"}
    <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAac0Ip2WK40BpDCV1X8oTRsMFVgU7fZXc&sensor=true"></script>
    <script>
        $(function() {
            var mapOptions = {
                center: new google.maps.LatLng(0, 0),
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                draggable: false
            };

            var map = new google.maps.Map(document.getElementById("gmap"), mapOptions);
            
            var marker = new google.maps.Marker({
                map: map
            });

            $(document).on("click", "[data-start]", function(e) {
                e.preventDefault();

                navigator.geolocation.watchPosition(function(position) {
                    var latLng = new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    );

                    marker.setPosition(latLng);
                    map.setCenter(latLng);

                }, function(err) {
                    //
                    console.log(err);
                }, {
                    enableHighAccuracy: true
                });
            });
        });
    </script>
{/block}
