(function() {

var SceneObject = (function() {
	/**
	* SceneObject
	*/
	function SceneObject() {

	}
	SceneObject.prototype = {
		constructor: SceneObject,
		update: function() {

		},
		render: function(ctx) {
	    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
	    ctx.fillRect (30, 30, 55, 50);
		}
	}

	return SceneObject;
}());
var Scene = (function() {
	/**
	 * Scene
	 */
	function Scene(name) {
		this.name = name;
		this._sceneObjects = [];
	}
	Scene.prototype = {
		constructor: Scene,
		update: function() {
			this._sceneObjects.forEach(function(sceneObject) {
				sceneObject.update();
			});
		},
		render: function(ctx) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			this._sceneObjects.forEach(function(sceneObject) {
				sceneObject.render(ctx);
			});
		},
		addSceneObject: function(sceneObject) {
			this._sceneObjects.push(sceneObject);
		}
	}
	return Scene;
}());
var SceneManager = (function() {
	/**
	 * SceneManager
	 */
	function SceneManager(name, context) {
		this.name = name;
		this._ctx = context;
		this._scene = null;
		this._intervalId = null;
	}
	SceneManager.prototype = {
		constructor: SceneManager,
		process: function() {
			if (this._scene) {
				this._scene.update();
				this._scene.render(this._ctx);
			}
		},
		setScene: function(scene) {
			this._scene = scene;
		}
	}

	return SceneManager;
}());
/**
 * This is the master object.
 */
var GameManager = (function(SceneManager, Scene, SceneObject) {
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
		createSceneObject: function(name) {
			if (!this._sceneObjects[name]) {
				var sceneObject = new SceneObject(name);
				this._sceneObjects[name] = sceneObject;
				return sceneObject;
			}

			throw new Error('SceneObject with name, "' + name + '" already exists.');
		},
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
}(SceneManager, Scene, SceneObject));

// Globals
window.gameManager = new GameManager();

}());