(function(){
	'use strict';

	var app = angular.module('marvel', ['ui.router', 'angular-md5']);

	app.value('marvelValidIds', []);

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

	app.run(function($http, marvelValidIds){
		$http.get('modules/validIds.json').then(function(data){
			Array.prototype.push.apply(marvelValidIds, data.data);
		});
	});

})();