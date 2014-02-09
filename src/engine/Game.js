/**
 * This is the Game description / creation object.
 */
var Game = (function Game() {
	function Game() {
		this.scenes = {};

		this.defaults = {
			startSceneName: ''
		}
	}
	Game.prototype = {
		constructor: Game,
		addScene: function() {

		},
		saveAsJSON: function() {
			// Build a JSON structure using the defaults
			// from all children objects and their children
		},

	}

	function create() {
		// create the game
		var game = new Game();

		// provide it with a default scene
		game.scenes['default'] = engine.Scene.create('default');
		game.defaults.startSceneName = 'default';

		return game;
	}

	function load(json) {

	}

	return { create: create, load: load };
}());
