/*=========================================================================================
    File Name: dashboard-lite.js
    Description: intialize advance cards
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Theme
    Version: 1.2
    Author: GeeksLabs
    Author URL: http://www.themeforest.net/user/geekslabs
==========================================================================================*/
(function(window, document, $) {
    'use strict';

    /**********************************************************
    *                    Projects Task Status                  *
    **********************************************************/
    //Get the context of the Chart canvas element we want to select
    var ctx2 = $("#line-stacked-area");

    // Chart Options
    var userPageVisitOptions = {
        responsive: true,
        maintainAspectRatio: false,
        pointDotStrokeWidth : 4,
        legend: {
            display: false,
            labels: {
                fontColor: '#FFF',
                boxWidth: 10,
            },
            position: 'top',
        },
        hover: {
            mode: 'label'
        },
        scales: {
            xAxes: [{
                display: false,
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    color: "rgba(255,255,255, 0.3)",
                    drawTicks: false,
                    drawBorder: false
                },
                ticks: {
                    display: false,
                    min: 0,
                    max: 70,
                    maxTicksLimit: 4
                },
            }]
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart - Legend'
        },
    };
    
    /****************************************************
    *               Employee Satisfaction               *
    ****************************************************/
    var randomScalingFactor = function() {
        return Math.round(Math.random() * 100 + 100);
    };
    var ctx3 = document.getElementById("earning-chart").getContext("2d");
    var datapoints = [120, 230, 180, 120, 125, 105, 110, 170];
    // Chart Options
    var earningOptions = {
        responsive: true,
        maintainAspectRatio: false,
        datasetStrokeWidth : 3,
        pointDotStrokeWidth : 4,
        tooltipFillColor: "rgba(0,0,0,0.8)",
        legend: {
            display: false,
            position: 'bottom',
        },
        hover: {
            mode: 'label'
        },
        scales: {
            xAxes: [{
                display: false,
            }],
            yAxes: [{
                display: false,
                ticks: {
                    min: 0,
                    max: 300
                },
            }]
        },
        title: {
            display: false,
            fontColor: "#FFF",
            fullWidth: false,
            fontSize: 40,
            text: '82%'
        }
    };

    // Chart Data
    var earningData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            data: datapoints,
            backgroundColor: 'rgba(45,149,191,0.1)',
            borderColor: "rgba(45,149,191,0.3)",
            borderWidth: 0,
            strokeColor : "#ff6c23",
            capBezierPoints: true,
            pointColor : "#fff",
            pointBorderColor: "rgba(45,149,191,1)",
            pointBackgroundColor: "#FFF",
            pointBorderWidth: 2,
            pointRadius: 4,
        }]
    };

    var earningConfig = {
        type: 'line',

        // Chart Options
        options : earningOptions,

        // Chart Data
        data : earningData
    };

    // Create the chart
    // var earningChart = new Chart(ctx3, earningConfig);
    window.earningChart = new Chart(ctx3, earningConfig);

    function updateSSP() {

        for (var i = 0, len = datapoints.length; i < len; ++i) {
            datapoints[i] = randomScalingFactor();
        }
        window.earningChart.update();
        setTimeout(updateSSP, 3*1000);

    }
    updateSSP();

})(window, document, jQuery);
