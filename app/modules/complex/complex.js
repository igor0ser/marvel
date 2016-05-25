(function(){
	'use strict';

	var app = angular.module('marvel');

	app.component('complexChart', {
		controller: 'ComplexChartController',
		templateUrl: '/modules/complex/complex.html'
	});

	app.controller('ComplexChartController', function(marvel, loading){
		var $ctrl = this;

		$ctrl.name = "Spider-man";
		var chart = d3.select('#complex-chart');
		var treeObj;
		$ctrl.chartType = 'radial';
		var drawChart = {
			linear: drawLinearLayout,
			radial: drawRadialLayout
		};

		$ctrl.draw = function(chartType){
			$ctrl.chartType = chartType;
			drawChart[chartType]();

			angular.element('.button-layouts .btn').removeClass('active');
			angular.element('#' + chartType).addClass('active');
		};

		$ctrl.getTree = function(){
			loading.show();
			marvel.getTree($ctrl.name, function(tree){
				if ( typeof tree === 'string') {
					console.log('string');
					console.log(tree);
					return;
				} else {
					console.log('success');
					console.log(tree);

/*					var cluster =d3.select('#complex-chart')
								.chart("cluster.cartesian")

					              .margin({ top: 20, right: 180, bottom: 20, left: 40 })
					              .radius("_COUNT_")
					              .levelGap(200)
					              .sortable("_DESC_")
					              //.zoomable([0.1, 3])
					              .collapsible(1)
					              //.duration(200)
					              ;

					          cluster.draw(tree);*/
					treeObj = tree;
					
					drawRadialLayout();
					loading.hide();
				}
			});

		};

		function drawRadialLayout(){
			chart.selectAll('*').remove();
			var cluster = chart.chart("cluster.radial")
				.radius(function(d) { if( d.size ) return Math.log(d.size); else return 3; })
				.levelGap(200)
				.zoomable([0.1, 3])
				.collapsible(1);
			cluster.draw(treeObj);
		}

		function drawLinearLayout(){
			chart.selectAll('*').remove();
			var cluster = chart.chart("cluster.cartesian")
				.margin({ top: 20, right: 180, bottom: 20, left: 40 })
				.radius("_COUNT_")
				.levelGap(200)
				.sortable("_DESC_")
				//.zoomable([0.1, 3])
				.collapsible(1)
				//.duration(200)
				;
			cluster.draw(treeObj);
		}

	});

})();