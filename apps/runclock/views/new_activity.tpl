{extends file="default/views/base.tpl"}
{block name="body"}
    <form class=actions>
        <a data-start href=#>start</a>
    </form>
    Run time: <span data-timer=0>00:00:00</span>
    Distance: <span data-distance=0>0</span> Km
    <div id=gmap style="width:100%;height:300px">
    </div>
{/block}
{block name="script"}
    <script src="js/deps/socket.io.min.js"></script>
    <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAac0Ip2WK40BpDCV1X8oTRsMFVgU7fZXc&sensor=true"></script>

    <script src=js/client.js></script>
    <script src=js/run-tracker.js></script>
    <script src=js/trail.js></script>
    <script>

        Client.init({
            io: io,
            host: "{setting value='runclock.socket_server'}"
        });

        $(function() {
            RunTracker.init({
                map: "gmap",
                timer: "[data-timer]"
            });

            RunTracker.setStartPosition();

            $(document).on("click", "[data-start]", function(e) {
                e.preventDefault();
                Client.emit("activity:start");
            });

            Client.on("activity:start", function(data) {
                console.log(data);

                RunTracker.startRun(data.id);

                // listen out for GPS position changes
                RunTracker.on("position:change", function(position) {
                    RunTracker.updatePosition(position);

                    // proxy through the update to the server
                    Client.emit("position:change", RunTracker.getData());
                });
            });
        });
    </script>
{/block}
