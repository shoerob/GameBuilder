/**
 * This is the Game description / creation object.
 */
var Game = (function Game() {
	function Game(model) {
		this.model = model;

		this.name = model.name;
		this.startSceneName = model.startSceneName;
		this.currentSceneName = '';
		this.scenes = {};
	}
	Game.prototype = {
		constructor: Game,
		resetFromModel: function() {
			this.startSceneName = this.model.startSceneName;
			this.currentSceneName = '';
			for (sceneName in this.scenes) {
				this.scenes[sceneName].resetFromModel();
			}

			this.init();
		},
		init: function() {
			this.currentSceneName = this.startSceneName;
		},
		getCurrentScene: function() {
			return this.scenes[this.currentSceneName];
		},
		addScene: function(scene) {
			if (this.scenes[scene.name]) {
				throw new Error("Scene with name, '" + scene.name + ",' already exists.");
			}

			this.scenes[scene.name] = scene;
			scene.game = this;
		},
		getModel: function() {
			var model = JSON.parse(JSON.stringify(this.model)); // clone
			for (sceneName in this.scenes) {
				model.scenes[sceneName] = this.scenes[sceneName].getModel();
			}

			return model;
		},
	}

	function create(name) {
		// default model
		var model = {
			modelType: 'Game',
			name: name,
			startSceneName: 'default', // HACK
			scenes: {}
		};

		// create the game
		return new Game(model);
	}

	function load(json) {

	}

	return { create: create, load: load };
}());
