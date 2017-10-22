
// Realtime chart
// ------------------------------
$(window).on("load", function(){

    // We use an inline data source in the example, usually data would
    // be fetched from a server

    var data = [],

        totalPoints = 60*30;

    function getRandomData() {

        if (data.length > 0)
            data = data.slice(1);

        // Do a random walk

        while (data.length < totalPoints) {

            var prev = data.length > 0 ? data[data.length - 1] : 1100000,
                y = prev + Math.random() * 100000 - 50000;

            if (y < 0) {
                y = 0;
            } else if (y > 1100000) {
                y = 1100000;
            }

            data.push(y);
        }

        // Zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res;
    }

    // Set up the control widget

    var updateInterval = 1000;

    var plot = $.plot("#realtime", [ getRandomData() ], {
        grid: {
            borderWidth: 1,
            borderColor: "transparent",
            color: '#999',
            minBorderMargin: 20,
            labelMargin: 10,
            margin: {
                top: 8,
                bottom: 20,
                left: 20
            },
        },
        series: {
            shadowSize: 0,   // Drawing is faster without shadows
            lines: {
                fill: true,
                fillColor: { colors: [ { opacity: 0.1 }, { opacity: 0.1 } ] }
            }
        },
        yaxis: {
            min: 0,
            max: 1500000
        },
        xaxis: {
            show: false
        },
        colors: ['#ef9a9a']
    });

    function update() {

        plot.setData([getRandomData()]);

        // Since the axes don't change, we don't need to call plot.setupGrid()

        plot.draw();
        setTimeout(update, updateInterval);
    }

    update();
});