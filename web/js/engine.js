(function() {

var utils = (function() {
    // http://pietschsoft.com/post/2009/07/29/javascript-Easily-Extend-an-Object-Element
    // Create Global "extend" method
    var extend = function(obj, extObj) {
        if (arguments.length > 2) {
            for (var a = 1; a < arguments.length; a++) {
                extend(obj, arguments[a]);
            }
        } else {
            for (var i in extObj) {
                obj[i] = extObj[i];
            }
        }
        return obj;
    };

    return { extend: extend };
}());
var GameTime = (function() {

	/**
	 * This keeps track of current and elapsed game times.
	 */
	function GameTime() {
		this._time = new Date().getTime();
		this._timePassed = 0;
	}
	GameTime.prototype = {
		constructor: GameTime,
		/**
		 * Updates the current and elapsed times.
		 */
		update: function() {
			this._timePassed = this._time;
			this._time = new Date().getTime();
			this._timePassed = this._time - this._timePassed;
		},
		/**
		 * Gets the current game time.
		 * @return {number} The current game time in milliseconds.
		 */
		getTime: function() {
			return this._time;
		},
		/**
		 * Gets the amount of time that passed since update was last called.
		 * @return {number} The time passed since last update in milliseconds.
		 */
		getTimePassed: function() {
			return this._timePassed;
		}
	};

	return GameTime;
}());
var SceneObject = (function() {
	/**
	* SceneObject
	*/
	function SceneObject(name, initFunc, updateFunc, renderFunc) {
		this.name = name;
		initFunc(this);
		this.update = updateFunc;
		this.render = renderFunc;
	}
	SceneObject.prototype = {
		constructor: SceneObject,
		update: function(gameTime) { },
		render: function(ctx) { }
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
		update: function(gameTime) {
			this._sceneObjects.forEach(function(sceneObject) {
				sceneObject.update(gameTime);
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
		process: function(gameTime) {
			if (this._scene) {
				this._scene.update(gameTime);
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
var GameManager = (function(utils, GameTime, SceneManager, Scene, SceneObject) {
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
		/**
		 * Starts the game timer.
		 */
		startInterval: function(frameInterval) {
			var self = this;
			
			/**
			 * The main GameManager gameTime object
			 */
			var gameTime = new GameTime();
			this._intervalId = setInterval(function() {
				gameTime.update();
				for (sceneManager in self._sceneManagers) {
					self._sceneManagers[sceneManager].process(gameTime);
				};
			}, frameInterval);
		},
		/**
		 * Stops the game timer.
		 */
		stopInterval: function() {
			clearInterval(this._intervalId);
		}
	};

	return GameManager;
}(utils, GameTime, SceneManager, Scene, SceneObject));

// Globals
window.gameManager = new GameManager();

}());