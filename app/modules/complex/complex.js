(function(){
	'use strict';

	var app = angular.module('marvel');

	app.component('complexChart', {
		controller: 'ComplexChartController',
		templateUrl: '/modules/complex/complex.html'
	});

	app.controller('ComplexChartController', function(){
		console.log('complex');
	});

})();