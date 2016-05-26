(function(){
	'use strict';

	var app = angular.module('marvel');

	app.component('complexChart', {
		controller: 'ComplexChartController',
		templateUrl: '/modules/complex/complex.html'
	});

	app.controller('ComplexChartController', function(marvel, loading){
		var $ctrl = this;

		$ctrl.name = "Captain America";
		var chart = d3.select('#complex-chart');
		var btnLayouts = document.querySelectorAll('.button-layouts .btn');
		var dataObj;
		$ctrl.chartType = 'radial';
		var drawChart = {
			linear: drawLinearLayout,
			radial: drawRadialLayout
		};

		$ctrl.draw = function(chartType){
			for (var i = 0; i < btnLayouts.length; i++) {
				btnLayouts[i].classList.remove('active');
			}
			document.getElementById(chartType).classList.add('active');
			$ctrl.chartType = chartType;

			if ( typeof dataObj === 'string') return;

			drawChart[$ctrl.chartType](dataObj);
		};

		$ctrl.getData = function(){
			loading.show();
			marvel.getTree($ctrl.name, function(data){
				dataObj = data;
				if ( typeof data === 'string') {
					drawText(data);
				} else {
					drawChart[$ctrl.chartType](data);
				}
				loading.hide();
			});

		};

		function drawRadialLayout(data){
			chart.selectAll('*').remove();
			var cluster = chart.chart("cluster.radial")
				.radius(function(d) { if( d.size ) return Math.log(d.size); else return 3; })
				.levelGap(200)
				.collapsible(1);
			cluster.draw(angular.copy(data));
		}

		function drawLinearLayout(data){
			chart.selectAll('*').remove();
			var tree = chart.chart("tree.cartesian")
				.margin({ top: 0, right: 250, bottom: 0, left: 40 })
				.radius(3)
				.collapsible(1);
			tree.draw(angular.copy(data));

			chart.selectAll('text')
				.attr('text-anchor', 'start')
				.attr('transform', 'translate(20)');
		}

		function drawText(data){
			chart.selectAll('*').remove();
			chart.append('text')
				.text(data)
				.attr('x', 960/2)
				.attr('y', 300)
				.attr('font-family', 'sans-serif')
				.attr('font-size', '20px')
				.attr('text-anchor', 'middle');
		}

		$ctrl.getData();

	});

})();