(function() {
	'use strict';

	angular.module('ftApp').controller('ChartsFlotController', chartsFlotController);

	chartsFlotController.$inject = [ '$scope' ];

	function chartsFlotController($scope) {

		// AREA
		$scope.areaData = [{
			"label": "Sales",
			"color": "#A599ED",
			"data": [
				["2013", 1000],
				["2014", 1623],
				["2015", 890],
				["2016", 1020],
				["2017", 1800]
			]
		}, {
			"label": "Expenses",
			"color": "#5AF57F",
			"data": [
				["2013", 800],
				["2014", 1200],
				["2015", 1100],
				["2016", 800],
				["2017", 1200]
			]
		}];

		$scope.areaOptions = {
			series: {
				lines: {
					show: true,
					fill: 0.8
				},
				points: {
					show: true,
					radius: 4
				}
			},
			grid: {
				borderColor: '#eee',
				borderWidth: 1,
				hoverable: true,
				backgroundColor: '#fff'
			},
			tooltip: true,
			tooltipOpts: {
				content: function(label, x, y) {
					return label + ' ' + x + ': ' + y;
				}
			},
			xaxis: {
				tickColor: '#fcfcfc',
				mode: 'categories'
			},
			yaxis: {
				min: 0,
				tickColor: '#eee'
			},
			shadowSize: 0
		};

		// SPLINE
		$scope.splineData = [{
			"label": "Uniques",
			"color": "#93B0BE",
			"data": [
				["Mar", 70],
				["Apr", 85],
				["May", 59],
				["Jun", 93],
				["Jul", 66],
				["Aug", 86],
				["Sep", 60]
			]
		}, {
			"label": "Recurrent",
			"color": "#56EAFF",
			"data": [
				["Mar", 21],
				["Apr", 12],
				["May", 27],
				["Jun", 24],
				["Jul", 16],
				["Aug", 39],
				["Sep", 15]
			]
		}];

		$scope.splineOptions = {
			series: {
				lines: {
					show: false
				},
				points: {
					show: true,
					radius: 4
				},
				splines: {
					show: true,
					tension: 0.4,
					lineWidth: 1,
					fill: 0.5
				}
			},
			grid: {
				borderColor: '#eee',
				borderWidth: 1,
				hoverable: true,
				backgroundColor: '#fcfcfc'
			},
			tooltip: true,
			tooltipOpts: {
				content: function(label, x, y) {
					return x + ' : ' + y;
				}
			},
			xaxis: {
				tickColor: '#fcfcfc',
				mode: 'categories'
			},
			yaxis: {
				min: 0,
				tickColor: '#eee',
				tickFormatter: function(v) {
					return v;
				}
			},
			shadowSize: 0
		};

		// BAR
		$scope.barData = [{
			"label": "Sales",
			"color": "#33C9BB",
			"data": [
				["2013", 1000],
				["2014", 1623],
				["2015", 890],
				["2016", 1800],
				["2017", 1200]
			]
		}];

		$scope.barOptions = {
			series: {
				bars: {
					align: 'center',
					lineWidth: 0,
					show: true,
					barWidth: 0.6,
					fill: 0.9
				}
			},
			grid: {
				borderColor: '#eee',
				borderWidth: 1,
				hoverable: true,
				backgroundColor: '#fcfcfc'
			},
			tooltip: true,
			tooltipOpts: {
				content: function(label, x, y) {
					return x + ' : ' + y;
				}
			},
			xaxis: {
				tickColor: '#fcfcfc',
				mode: 'categories'
			},
			yaxis: {
				// position: 'right' or 'left'
				tickColor: '#eee'
			},
			shadowSize: 0
		};

		// STACKED
		$scope.stackedData = [{
			"label": "Thriller",
			"color": "#51bff2",
			"data": [
				["2000", 50],
				["2001", 40],
				["2002", 45],
				["2003", 40],
				["2004", 30],
				["2005", 20],
				["2006", 10],
				["2007", 15],
				["2008", 20],
				["2009", 15]
			]
		}, {
			"label": "Comedy",
			"color": "#4a8ef1",
			"data": [
				["2000", 40],
				["2001", 10],
				["2002", 25],
				["2003", 20],
				["2004", 30],
				["2005", 50],
				["2006", 50],
				["2007", 55],
				["2008", 30],
				["2009", 65]
			]
		}, {
			"label": "Horror",
			"color": "#f0693a",
			"data": [
				["2000", 10],
				["2001", 50],
				["2002", 30],
				["2003", 40],
				["2004", 40],
				["2005", 30],
				["2006", 40],
				["2007", 30],
				["2008", 50],
				["2009", 20]
			]
		}];

		$scope.stackedOptions = {
			series: {
				stack: true,
				bars: {
					align: 'center',
					lineWidth: 0,
					show: true,
					barWidth: 0.6,
					fill: 0.9
				}
			},
			grid: {
				borderColor: '#eee',
				borderWidth: 1,
				hoverable: true,
				backgroundColor: '#fcfcfc'
			},
			tooltip: true,
			tooltipOpts: {
				content: function(label, x, y) {
					return x + ' : ' + y;
				}
			},
			xaxis: {
				tickColor: '#fcfcfc',
				mode: 'categories'
			},
			yaxis: {
				// position: 'right' or 'left'
				tickColor: '#eee'
			},
			shadowSize: 0
		};

		// PIE
		$scope.pieData = [{
			"label": "Thriller",
			"color": "#4acab4",
			"data": 40
		}, {
			"label": "Horror",
			"color": "#ffea88",
			"data": 30
		}, {
			"label": "Action",
			"color": "#ff8153",
			"data": 50
		}, {
			"label": "Drama",
			"color": "#878bb6",
			"data": 60
		}, {
			"label": "Comedy",
			"color": "#b2d767",
			"data": 100
		}];

		$scope.pieOptions = {
			series: {
				pie: {
					show: true,
					innerRadius: 0,
					label: {
						show: true,
						radius: 0.8,
						formatter: function(label, series) {
							return '<div class="flot-pie-label">' + Math.round(series.percent) + '%</div>';
						},
						background: {
							opacity: 0.8,
							color: '#222'
						}
					}
				}
			}
		};

		// DONUT
		$scope.donutData = [{
			"color": "#39C558",
			"data": 50,
			"label": "Thriller"
		}, {
			"color": "#00b4ff",
			"data": 80,
			"label": "Comedy"
		}, {
			"color": "#FFBE41",
			"data": 50,
			"label": "Horror"
		}, {
			"color": "#ff3e43",
			"data": 70,
			"label": "SF"
		}, {
			"color": "#937fc7",
			"data": 100,
			"label": "Action"
		}];

		$scope.donutOptions = {
			series: {
				pie: {
					show: true,
					innerRadius: 0.5
				}
			}
		};
	}
})();
