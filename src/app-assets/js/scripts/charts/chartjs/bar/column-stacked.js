/*=========================================================================================
    File Name: column-stacked.js
    Description: Chartjs column stacked chart
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Theme
    Version: 1.2
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Column stacked chart
// ------------------------------
$(window).on("load", function(){

    var randomScalingFactor = function() {
        return Math.round(Math.random() * 100 +100);
    };


    var datapoints = [0, 20, 20, 60, 60, 120, 230, 180, 230, 180, 120, 125, 120, 125, 105, 110, 170,0, 20, 20, 60, 60, 120, 230, 180, 120, 125, 105, 110, 170];
    var datapoints1 = [120, 125, 105, 110, 0, 20, 20, 60, 60, 120, 230,230, 180, 120, 125, 180, 120, 125, 105, 110, 170, 170,0, 20, 20, 60, 60, 120, 230, 180];
    var datapoints2 = [120, 125, 105, 60, 120, 230, 180,0, 20, 20, 60, 60, 120, 230, 180, 230, 180, 120, 125, 120, 125, 105, 110, 170 ,110, 170,0, 20, 20, 60];
    var datapoints3 = [102, 30, 0, 20, 20, 60, 60, 120, 230, 180, 120, 125, 105, 110, 170, 80,20,0, 20, 20, 60,230, 180, 120, 125, 60, 125, 105, 110, 170];

    // Get the context of the Chart canvas element we want to select
    var ctx = $("#column-stacked");
    var ctxcolumn = $("#column-stacked1");
    var ctxcolumn2 = $("#column-stacked2");
    var ctxcolumn3 = $("#column-stacked3");

    // Chart Options
    var chartOptions = {
        title:{
            display:false,
            text:"Chart.js Column Chart - Stacked"
        },
        tooltips: {
            mode: 'label'
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration:500,
        scales: {
            xAxes: [{
                stacked: true,
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }],
            yAxes: [{
                stacked: true,
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }]
        }
    };

    // Chart Data
    var chartData = {
        labels: ["1", "2", "3", "4", "5","1", "2", "3", "4", "5","1", "2", "3", "4", "5","1", "2", "3", "4", "5","1", "2", "3", "4", "5","1", "2", "3", "4", "5"],
        datasets: [{
            label: "My First dataset",
            data: datapoints,
            backgroundColor: "#90caf9",
            hoverBackgroundColor: "#64b5f6",
            borderColor: "transparent"
        }, {
            label: "My Second dataset",
            data: datapoints1,
            backgroundColor: "#c5e1a5",
            hoverBackgroundColor: "#aed581",
            borderColor: "transparent"
        },
        {
            label: "My Third dataset",
            data: datapoints2,
            backgroundColor: "#ffcc80",
            hoverBackgroundColor: "#ffb74d",
            borderColor: "transparent"
        },
        {
            label: "My Third dataset",
            data: datapoints3,
            backgroundColor: "#ef9a9a",
            hoverBackgroundColor: "#e57373",
            borderColor: "transparent"
        }
        ]
    };

    var chartData2 = {
        labels: ["1", "2", "3", "4", "5","1", "2", "3", "4", "5","1", "2", "3", "4", "5","1", "2", "3", "4", "5","1", "2", "3", "4", "5","1", "2", "3", "4", "5"],
        datasets: [{
            label: "App",
            data: datapoints,
            backgroundColor: "#90caf9",
            hoverBackgroundColor: "#64b5f6",
            borderColor: "transparent"
        }, {
            label: "Web",
            data: datapoints1,
            backgroundColor: "#c5e1a5",
            hoverBackgroundColor: "#aed581",
            borderColor: "transparent"
        }]
    };


    var chartDataCCType = {
        labels: ["1", "2", "3", "4", "5","1", "2", "3", "4", "5","1", "2", "3", "4", "5","1", "2", "3", "4", "5","1", "2", "3", "4", "5","1", "2", "3", "4", "5"],
        datasets: [{
            label: "Banner",
            data: datapoints,
            backgroundColor: "#90caf9",
            hoverBackgroundColor: "#64b5f6",
            borderColor: "transparent"
        }, {
            label: "Rich Media",
            data: datapoints1,
            backgroundColor: "#c5e1a5",
            hoverBackgroundColor: "#aed581",
            borderColor: "transparent"
        },{
            label: "Video",
            data: datapoints2,
            backgroundColor: "#ffcc80",
            hoverBackgroundColor: "#ffb74d",
            borderColor: "transparent"
        },
        {
            label: "Native",
            data: datapoints3,
            backgroundColor: "#ef9a9a",
            hoverBackgroundColor: "#e57373",
            borderColor: "transparent"
        }]
    };

    var config = {
        type: 'bar',

        // Chart Options
        options : chartOptions,

        data : chartData
    };

    var config1 = {
        type: 'bar',

        // Chart Options
        options : chartOptions,

        data : chartData2
    };

    var config2 = {
        type: 'bar',

        // Chart Options
        options : chartOptions,

        data : chartDataCCType
    };

    // Create the chart
    window.lineChart = new Chart(ctx, config);
    window.lineChart1 = new Chart(ctxcolumn, config);
    window.lineChart2 = new Chart(ctxcolumn2, config1);
    window.lineChart3 = new Chart(ctxcolumn3, config2);




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
        for (var l = 0, len3 = datapoints1.length; l < len3; ++l) {
            datapoints3[l] = Math.random() * 100 < 0.05 ? NaN : randomScalingFactor();
        }
        window.lineChart.update();
        window.lineChart1.update();
        window.lineChart2.update();
        window.lineChart3.update();
        setTimeout(updateSSP, 3*1000);

    }
    updateSSP();

});