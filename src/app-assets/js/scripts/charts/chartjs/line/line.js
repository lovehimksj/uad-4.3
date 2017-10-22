/*=========================================================================================
    File Name: line.js
    Description: Chartjs simple line chart
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Theme
    Version: 1.2
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Line chart
// ------------------------------
$(window).on("load", function(){
    var datapoints =  [120, 125, 105, 110, 110, 220, 220, 100, 110, 120, 230, 230, 180, 120, 125, 180, 120, 125, 105, 110, 170, 170, 200, 120, 220, 160, 260, 250, 230, 180];
    var datapoints1 = [100, 100, 80,  70,  80,  190, 180,  80,  90,  90, 170, 200, 150, 100, 100, 100, 100, 100,  85,  90, 100, 155, 150, 100, 100, 140, 120, 120, 200, 60];
    var datapoints2 = [40,  50,  60,  40,  45,  120, 130,  70,  40,  60,  40, 140, 100, 80,   75,  70,  80,  60,  70,  60,  60,  60, 120,  70,  80, 100, 80,   95, 160, 17];

    var randomScalingFactor = function() {
        return Math.round(Math.random() * 100 +100);
    };
    //Get the context of the Chart canvas element we want to select
    var ctx = $("#line-chart");

    // Chart Options
    var chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'top',
        },
        hover: {
            mode: 'label'
        },
        scales: {
            xAxes: [{
                display: false,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: false,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Counts'
                }
            }]
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart - Legend'
        }
    };

    // Chart Data
    var chartData = {
        labels: ["11:00", "11:00", "11:00", "11:00", "11:00", "11:00", "11:00","11:00", "11:00", "11:00", "11:00", "11:00", "11:00", "11:00","11:00", "11:00", "11:00", "11:00", "11:00", "11:00", "11:00","11:00", "11:00", "11:00", "11:00", "11:00", "11:00", "11:00","11:00", "11:00"],
        datasets: [{
            label: "Request",
            data: datapoints,
            fill: false,
            borderDash: [5, 5],
            borderColor: "#673AB7",
            pointBorderColor: "#673AB7",
            pointBackgroundColor: "#FFF",
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
        }, {
            label: "Response",
            data: datapoints1,
            fill: false,
            borderDash: [5, 5],
            borderColor: "#00BCD4",
            pointBorderColor: "#00BCD4",
            pointBackgroundColor: "#FFF",
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
        }, {
            label: "Wins",
            data: datapoints2,
            borderDash: [5, 5],
            fill: false,
            borderColor: "#FF5722",
            pointBorderColor: "#FF5722",
            pointBackgroundColor: "#FFF",
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
        }]
    };

    var config = {
        type: 'line',

        // Chart Options
        options : chartOptions,

        data : chartData
    };

    // Create the chart
    // var lineChart = new Chart(ctx, config);
    window.lineChart = new Chart(ctx, config);

    function updateSSP() {

        for (var i = 0, len = datapoints.length; i < len; ++i) {
            datapoints[i] = Math.random() * 100 < 0.05 ? NaN : randomScalingFactor();
        }
        for (var j = 0, len1 = datapoints1.length; j < len1; ++j) {
            datapoints1[j] = Math.random() * 100 < 0.05 ? NaN : randomScalingFactor();
        }

        for (var k = 0, len2 = datapoints.length; k < len2; ++k) {
            datapoints2[k] = Math.random() * 100 < 0.05 ? NaN : randomScalingFactor();
        }

        window.lineChart.update();
        setTimeout(updateSSP, 3*1000);

    }
    updateSSP();
});




