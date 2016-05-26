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

		_this.getSeriesByCharId = function(id){
			return $http.get(URL_CHARS + '/' + id + '/series' + '?' + getAuth() +'&limit=40');
		};

		_this.getNRandomCharacters = function(n, callback){
			var promises = [];
			var randomId;

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
						} 
					}
					callback(chars);
			});
		};

		_this.getTree = function(name, callback){
			_this.getCharacterByName(name)
				.then(function(responce){
					var char = responce.data.data.results[0];
					if (!char) {
						callback("No character with such name.");
						return;
					}

					_this.getSeriesByCharId(char.id)
						.then(function(responce){
							var series = responce.data.data.results;

							if (!series.length) {
								callback("This character has zero series.");
								return;
							}

							var tree = {
								name: name,
								children: []
							};

							for (var i = 0; i < series.length; i++) {
								tree.children.push({
									name: series[i].title,
									children: []
								});

								var creators = series[i].creators.items;

								for (var j = 0; j < creators.length; j++) {
									tree.children[i].children.push({
										name: creators[j].name
									});
								}
							}

							callback(tree);
						});
				});
		};

	});


	app.service('loading', function(){
		var loadingWindow = document.getElementById('loading');
		this.hide = function(){
			loadingWindow.style.display = 'none';
		};

		this.show = function(){
			loadingWindow.style.display = 'block';
		};
	});
})();


var spidy = "1009610";