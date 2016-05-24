(function(){
	'use strict';

	var app = angular.module('marvel');

	app.component('simpleChart', {
		controller: 'SimpleChartController',
		templateUrl: '/modules/simple/simple.html'
	});

	app.controller('SimpleChartController', function(marvel){
		var $ctrl = this;
		$ctrl.arr = [];

		/*marvel.getNRandomCharacters(10, function(chars){
			console.log(chars);
		});*/

		var data = [{
			name: 'Spider-man',
			comics: 200
		},{
			name: 'Captain America',
			comics: 300
		},{
			name: 'Cardiac',
			comics: 50
		},{
			name: 'Cargill',
			comics: 60
		},{
			name: 'Charles Xavier',
			comics: 10
		},{
			name: 'Clint Barton',
			comics: 25
		},{
			name: 'Contessa',
			comics: 81
		},{
			name: 'Corsair',
			comics: 5
		},{
			name: 'Smasher',
			comics: 50
		},{
			name: 'Spectrum',
			comics: 20
		},];

		function createChart(){
			d3.select('#simple-chart')
				.selectAll('circle')
				.data(data)
				.enter()
				.append('circle')
					.attr('r', (d) => d.comics/10)
					.attr('cx', (d) => d.comics/20 + 100 )
					.attr('cy', (d) => d.comics/20 + 100 )
					.attr('fill', 'transparent' )
					.attr('stroke', 'red' )
		}

		createChart();


	});

})();