/**
 * This is the master object.
 */
var GameManager = (function(utils, SceneManager, Scene, SceneObject) {
	function GameManager() {
		this._sceneManagers = {};
		this._scenes = {};
		this._sceneObjects = {};
		this._intervalId = null;
	}
	GameManager.prototype = {
		constructor: GameManager,
		createSceneManager: function(name, context) {
			if (!this._sceneManagers[name]) {
				var sceneManager = new SceneManager(name, context);
				this._sceneManagers[name] = sceneManager;
				return sceneManager;
			}

			throw new Error('SceneManager with name, "' + name + '" already exists.');
		},
		createScene: function(name) {
			if (!this._scenes[name]) {
				var scene = new Scene(name);
				this._scenes[name] = scene;
				return scene;
			}

			throw new Error('Scene with name, "' + name + '" already exists.');
		},
		createSceneObject: function(name, initFunc, updateFunc, renderFunc) {
			if (!this._sceneObjects[name]) {
				var sceneObject = new SceneObject(name, initFunc, updateFunc, renderFunc);
				this._sceneObjects[name] = sceneObject;
				return sceneObject;
			}

			throw new Error('SceneObject with name, "' + name + '" already exists.');
		},
		// createPointSceneObject: function(name) {
		// 	return utils.extend(this.createSceneObject(name), { render: function(ctx) {
		// 		ctx.fillStyle = "rgba(0, 200, 0, 0.5)";
		// 	    ctx.fillRect (1, 1, 4, 4);
		// 	} })
		// },
		startInterval: function(frameInterval) {
			var self = this;
			this._intervalId = setInterval(function() {
				for (sceneManager in self._sceneManagers) {
					self._sceneManagers[sceneManager].process();
				};
			}, frameInterval);
		},
		stopInterval: function() {
			clearInterval(this._intervalId);
		}
	}

	return GameManager;
}(utils, SceneManager, Scene, SceneObject));