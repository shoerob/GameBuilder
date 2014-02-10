/**
 * This is the Game description / creation object.
 */
var Game = (function Game() {
	function Game(model) {
		this.model = model;

		this.startSceneName = model.startSceneName;
		this.currentSceneName = '';
		this.scenes = {};
	}
	Game.prototype = {
		constructor: Game,
		init: function() {
			this.currentSceneName = this.startSceneName;
		},
		getCurrentScene: function() {
			return this.scenes[this.currentSceneName];
		},
		addScene: function() {

		},
		getModel: function() {
			var model = JSON.parse(JSON.stringify(this.model)); // clone
			for (sceneName in this.scenes) {
				model.scenes[sceneName] = this.scenes[sceneName].getModel();
			}

			return model;
		}
	}

	function create() {
		// default model
		var model = {
			modelType: 'Game',
			name: '',
			startSceneName: '',
			scenes: {}
		};

		// create the game
		var game = new Game(model);

		// TODO: we shouldn't provide default children here

		// provide it with a default scene
		game.scenes['default'] = engine.Scene.create('default');
		game.startSceneName = 'default';
		game.init();

		return game;
	}

	function load(json) {

	}

	return { create: create, load: load };
}());
