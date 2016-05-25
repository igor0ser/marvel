 (function(){
	'use strict';

	var app = angular.module('marvel');

	app.service('marvel', function($http, $q, md5, marvelValidIds){
		var _this = this;
		var PUBLIC_KEY = 'b46aeca62107287fa13b2564c2cabcae';
		var PRIVATE_KEY = 'c4d6a1f0f098cdcc2ede8192252b426bcd921119';
		var URL_CHARS = 'http://gateway.marvel.com/v1/public/characters';
		var URL_COMICS = 'http://gateway.marvel.com/v1/public/comics';

		function getAuth(){
			var ts = Date.now();
			var hash = md5.createHash(ts + PRIVATE_KEY + PUBLIC_KEY);
			var res = 'ts=' + ts + '&apikey=' + PUBLIC_KEY + '&hash=' + hash;
			return res;
		}

		_this.getCharacterById = function(id){
			return $http.get(URL_CHARS + '/' + id + '?' + getAuth());
		};

		_this.getCharacterByName = function(name){
			return $http.get(URL_CHARS + '?name=' + name + '&' + getAuth());
		};

		_this.getComicsByCharId = function(id){
			return $http.get(URL_COMICS + '?limit=50&characters=' + id + '&' + getAuth());
		};

		_this.getNRandomCharacters = function(n, callback){
			var promises = [];
			var randomId;
			console.log(1);

			for (var i = 0; i < n; i++) {
				randomId = marvelValidIds[Math.round(Math.random() * marvelValidIds.length)];
				promises.push(_this.getCharacterById(randomId));
			}

			$q.all(promises).then(function(responces){
					var chars = [];

					for (var i = 0; i < responces.length; i++) {
						var res = responces[i].data.data.results[0];
						if (res){
							chars.push(res);
						} else {
							console.log('some error happened');
						}
					}
					callback(chars);
			});
		};

		_this.getTree = function(name, callback){
			var tree = {
				name: '',
				children: []
			};
			_this.getCharacterByName(name)
				.then(function(responce){
					console.log(responce.data.data.results[0]);
					var char = responce.data.data.results[0];
					if (!char) {
						callback("No character with such name.");
						return;
					}

					_this.getComicsByCharId(char.id)
						.then(function(responce){
							var comics = responce.data.data.results;
							console.log(comics);

							if (!comics.length) {
								callback("This character has zero comics.");
								return;
							}

							for (var i = 0; i < comics.length; i++) {
								tree.children.push({
									name: comics[i].title
								});
							}

							tree.name = name;
							callback(tree);
						});
				});
		};

	});
})();
