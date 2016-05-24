(function(){
	'use strict';

	var app = angular.module('marvel', ['ui.router', 'angular-md5']);

	app.value('marvelNames', []);

	app.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/simple');
		$stateProvider
			.state('simple', {
				url: '/simple',
				template: '<simple-chart></simple-chart>'
			})
			.state('complex', {
				url: '/complex',
				template: '<complex-chart></complex-chart>'
			});
	});

	app.run(function($http, marvelNames){
		$http.get('modules/characters.json').then(function(data){
			Array.prototype.push.apply(marvelNames, data.data);
		});
	});

})();