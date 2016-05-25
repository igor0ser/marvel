(function(){
	'use strict';

	var app = angular.module('marvel');

	app.component('complexChart', {
		controller: 'ComplexChartController',
		templateUrl: '/modules/complex/complex.html'
	});

	app.controller('ComplexChartController', function(marvel){
		var $ctrl = this;

		$ctrl.name = "Spider-man";

		$ctrl.getTree = function(){
			var tree = marvel.getTree($ctrl.name, function(tree){
				if ( typeof tree === 'string') {
					console.log('string');
					console.log(tree);
					return;
				} else {
					console.log('success');
					console.log(tree);
				}


			});

		};
	});

})();