(function(){
	'use strict';

	var app = angular.module('marvel');
	
	app.controller('MarvelCtrl', function($http){
		var ctrl = this;
		ctrl.img = "img/logo.png";
		console.log(123);
		var d = Date.now();
		var config = {
			name: 'Spider-man',
			nameStartsWith: 'Sp',
			ts: d,
			apikey: 'b46aeca62107287fa13b2564c2cabcae',
			hash: md5(d + 'c4d6a1f0f098cdcc2ede8192252b426bcd921119' + 'b46aeca62107287fa13b2564c2cabcae')
		};

		var config2 = {
			name: 'Spider-man',
			ts: '1464016175761',
			apikey: 'b46aeca62107287fa13b2564c2cabcae',
			hash: '979ae3a022176737b43c402f6217a70e'
		};

		$http.get('http://gateway.marvel.com/v1/public/characters?name=Spider-man&ts=1464016175761&apikey=b46aeca62107287fa13b2564c2cabcae&hash=979ae3a022176737b43c402f6217a70e').then(function successCallback(response) {
			console.log('success');
			console.log(response.data.data.results[0]);
			ctrl.img = response.data.data.results[0].thumbnail.path + '.' + response.data.data.results[0].thumbnail.extension;
			console.log(ctrl.img);
		}, function errorCallback(response) {
			console.log('error');
			console.log(response);
		});

	});

})();