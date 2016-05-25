(function(){
	'use strict';

	var app = angular.module('marvel');

	app.component('simpleChart', {
		controller: 'SimpleChartController',
		templateUrl: '/modules/simple/simple.html'
	});

	app.controller('SimpleChartController', function(marvel){
		var $ctrl = this;

		var data = getMockChars();

		var chart = d3.select('#simple-chart');
		var chartH = 500;
		var barW = 50;
		var margin = 10;


		$ctrl.colorscales = [
			{name: 'category10', scale: d3.scale.category10},
			{name: 'category20', scale: d3.scale.category20},
			{name: 'category20b', scale: d3.scale.category20b},
			{name: 'category20c', scale: d3.scale.category20c}
		];

		$ctrl.currentColorScale = "0";

		function getScale(data){
			var max = 0;
			for (var i = 0; i < data.length; i++) {
				if (+data[i].comics.available > max) {
					max = +data[i].comics.available;
				}
			}
			return d3.scale.linear()
								.domain([0, max])
								.range([0, 410]);
		}

		function createChart(){
			chart.selectAll('*').remove();

			var linearScale = getScale(data);

			chart
				.selectAll('rect')
				.data(data)
				.enter()
				.append('rect')
				.attr('x', (d,i) => 10 + i * (barW + margin) )
				.attr('y', d => chartH - linearScale(d.comics.available))
				.attr('width', barW)
				.attr('height', d => linearScale(d.comics.available));

			chart
				.selectAll('image')
				.data(data)
				.enter()
				.append('svg:image')
				.attr('xlink:href', d => (d.thumbnail.path + '.' + d.thumbnail.extension) )
				.attr('width', barW)
				.attr('height', barW)
				.attr('x', (d,i) => 10 + i * 60)
				.attr('y', d => chartH - linearScale(d.comics.available) - 85 );

			chart
				.selectAll('text.name')
				.data(data)
				.enter()
				.append('text')
				.text(d => d.name.substring(0, 10))
				.attr('x', (d,i) => 10 + i * (barW + margin) + barW / 2)
				.attr('y', d => chartH - linearScale(d.comics.available) - 20)
				.attr('font-family', 'sans-serif')
				.attr('font-size', '11px')
				.attr('text-anchor', 'middle');

			chart
				.selectAll('text.value')
				.data(data)
				.enter()
				.append('text')
				.text(d => d.comics.available)
				.attr('x', (d, i) => 10 + i*60 + 25)
				.attr('y', d => chartH - linearScale(d.comics.available) - 5)
				.attr('font-family', 'sans-serif')
				.attr('font-size', '14px')
				.attr('text-anchor', 'middle')
				.attr('angle', 45);
		}

		$ctrl.changeColors = function(){
			var currentColorscale = $ctrl.colorscales[+$ctrl.currentColorScale].scale();
			chart
				.selectAll('rect')
				.data(data)
				.attr('fill', (d, i) => currentColorscale(i));
		};

		$ctrl.getData = function(){
			marvel.getNRandomCharacters(10, (chars) => {
				data = chars;
				createChart();
				$ctrl.changeColors();
				console.log();
			});
		};

		createChart();
		$ctrl.changeColors();

	});

})();




function getMockChars(){
	return [{
			name: 'Spider-man',
			comics: { 
				available: 200
			},
			thumbnail:{
				path: 'img/chars/spidy',
				extension: 'jpg'
			}
			},{
				name: 'Captain America',
				comics: { 
					available: 300
				},
				thumbnail:{
					path: 'img/chars/cap',
					extension: 'jpg'
				}
			},{
				name: 'Black Panther',
				comics: { 
					available: 50
				},
				thumbnail:{
					path: 'img/chars/panther',
					extension: 'jpg'
				}
			},{
				name: 'Widow',
				comics: { 
					available: 60
				},
				thumbnail:{
					path: 'img/chars/widow',
					extension: 'jpg'
				}
			},{
				name: 'Charles Xavier',
				comics: { 
					available: 10
				},
				thumbnail:{
					path: 'img/chars/cap',
					extension: 'jpg'
				}
			},{
				name: 'Clint Barton',
				comics: { 
					available: 25
				},
				thumbnail:{
					path: 'img/chars/cap',
					extension: 'jpg'
				}
			},{
				name: 'Contessa',
				comics: { 
					available: 81
				},
				thumbnail:{
					path: 'img/chars/cap',
					extension: 'jpg'
				}
			},{
				name: 'Corsair',
				comics: { 
					available: 5,
				},
				thumbnail:{
					path: 'img/chars/cap',
					extension: 'jpg'
				}
			},{
				name: 'Smasher',
				comics: { 
					available: 50
				},
				thumbnail:{
					path: 'img/chars/cap',
					extension: 'jpg'
				}
			},{
				name: 'Spectrum',
				comics: { 
					available: 20
				},
				thumbnail:{
					path: 'img/chars/cap',
					extension: 'jpg'
				}
		},];
}