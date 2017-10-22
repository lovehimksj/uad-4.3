/*=========================================================================================
    File Name: line-area.js
    Description: Chartjs line area chart
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Theme
    Version: 1.2
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Line area chart
// ------------------------------
window.onload = function() {
var randomScalingFactor = function() {
    return Math.round(Math.random() * 100 +100);
};

var SSPList = ['SSP1','SSP2','SSP3','SSP4'];

var datapoints = [0, 20, 20, 60, 60, 120, 230, 180, 230, 180, 120, 125, 120, 125, 105, 110, 170,0, 20, 20, 60, 60, 120, 230, 180, 120, 125, 105, 110, 170];
var datapoints1 = [120, 125, 105, 110, 0, 20, 20, 60, 60, 120, 230,230, 180, 120, 125, 180, 120, 125, 105, 110, 170, 170,0, 20, 20, 60, 60, 120, 230, 180];
var datapoints2 = [120, 125, 105, 60, 120, 230, 180,0, 20, 20, 60, 60, 120, 230, 180, 230, 180, 120, 125, 120, 125, 105, 110, 170 ,110, 170,0, 20, 20, 60];
var datapoints3 = [102, 30, 0, 20, 20, 60, 60, 120, 230, 180, 120, 125, 105, 110, 170, 80,20,0, 20, 20, 60,230, 180, 120, 125, 60, 125, 105, 110, 170];
var config = {
    type: 'bar',
    data: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12","0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12","0", "1", "2", "3"],
        datasets: [{
            data: datapoints,
            label: SSPList[0],
            backgroundColor: "#90caf9",
            hoverBackgroundColor: "#64b5f6",
            borderColor: "transparent"
        }, {
            data: datapoints1,
            label: SSPList[1],
            backgroundColor: "#c5e1a5",
            hoverBackgroundColor: "#aed581",
            borderColor: "transparent"
        },
        {
            data: datapoints2,
            label: SSPList[2],
            backgroundColor: "#ffcc80",
            hoverBackgroundColor: "#ffb74d",
            borderColor: "transparent"
        }, {
            data: datapoints3,
            label: SSPList[3],
            backgroundColor: "#ef9a9a",
            hoverBackgroundColor: "#e57373",
            borderColor: "transparent"
        }]
    },
    options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each bar to be 2px wide and green
        elements: {
            rectangle: {
                borderWidth: 2,
                borderColor: 'rgb(0, 255, 0)',
                borderSkipped: 'bottom'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration:500,
        legend: {
            position: 'top',
        },
        scales: {
            xAxes: [{
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
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }]
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart'
        }
    }
};

    var ctx = document.getElementById("area-chart");
    window.myLine = new Chart(ctx, config);

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
    window.myLine.update();
    setTimeout(updateSSP, 3*1000);

}
updateSSP();

};