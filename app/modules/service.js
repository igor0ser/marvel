(function(){
	'use strict';

	var app = angular.module('marvel');

	app.service('marvel', function($http, $q, md5, marvelNames){
		var _this = this;
		var PUBLIC_KEY = 'b46aeca62107287fa13b2564c2cabcae';
		var PRIVATE_KEY = 'c4d6a1f0f098cdcc2ede8192252b426bcd921119';
		var URL = 'http://gateway.marvel.com/v1/public/characters';

		var MIN_ID = 1009144;
		var MAX_ID = 1011421;

		function getAuth(){
			var ts = Date.now();
			var hash = md5.createHash(ts + PRIVATE_KEY + PUBLIC_KEY);
			var res = 'ts=' + ts + '&apikey=' + PUBLIC_KEY + '&hash=' + hash;
			return res;
		}

		_this.getCharacterById = function(id){
			return $http.get(URL + '/' + id + '?' + getAuth());
		};

		_this.getCharacterByName = function(name){
			return $http.get(URL + '?name=' + name + '&' + getAuth());
		};

		_this.getNRandomCharacters = function(n, callback){
			var promises = [];
			var random, name, names = [];

			for (var i = 0; i < n; i++) {
				random = Math.round(Math.random() * marvelNames.length);
				name = marvelNames[random];
				names.push(name);
				promises.push(_this.getCharacterByName(name));
			}

			$q.all(promises).then(function(values){
					var chars = [];
					for (var i = 0; i < values.length; i++) {
						if (values[i].data.data.results[0]){
							chars.push(values[i].data.data.results[0]);
						} else {
							console.log(names[i]);
						}
					}
					callback(chars);
			});

		};

	});
})();
