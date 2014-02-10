var engine = (function() {

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

var SceneObject = (function() {
	/**
	* SceneObject
	*/
	function SceneObject(model) {
		this.model = model;

		this.name = model.name;
		this.position = { x: model.position.x, y: model.position.y };
		this.bounds = { width: model.bounds.width, height: model.bounds.height };

		this.scene = null; // parent
	}
	SceneObject.prototype = {
		constructor: SceneObject,
		resetFromModel: function() {
			this.position = { x: this.model.position.x, y: this.model.position.y };
			this.bounds = { width: this.model.bounds.width, height: this.model.bounds.height };
		},
		update: function(gameTime) { 
			this.position.y++;
		},
		render: function(ctx) {
			ctx.fillStyle = "rgba(0, 200, 0, 0.5)";
		    ctx.fillRect(
		    	this.position.x - this.bounds.width/2, 
		    	this.position.y - this.bounds.height/2, 
		    	this.bounds.width,
		    	this.bounds.height);
		},
		getModel: function() {
			var model = JSON.parse(JSON.stringify(this.model)); // clone
			return model;
		}
	}

	function create(name) {
		// default model
		var model = {
			modelType: 'SceneObject',
			name: name,
			position: { x: 320, y: 240 },
			bounds: { width: 25, height: 25 }
		};

		return new SceneObject(model);
	}

	function load(json) {

	}

	return { create: create, load: load }
}());
var Scene = (function Scene() {

	function Scene(model) {
		this.model = model;
		this.name = model.name;
		this.sceneObjects = [];
		this.sceneObjectsByName = {};

		this.game = null; // parent
	}
	Scene.prototype = {
		constructor: Scene,
		resetFromModel: function() {
			this.sceneObjects.forEach(function(sceneObject) {
				sceneObject.resetFromModel();
			});
		},
		update: function(gameTime) {
			this.sceneObjects.forEach(function(sceneObject) {
				sceneObject.update(gameTime);
			});
		},
		render: function(ctx) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			this.sceneObjects.forEach(function(sceneObject) {
				sceneObject.render(ctx);
			});
		},
		addSceneObject: function(sceneObject) {
			if (this.sceneObjectsByName[sceneObject.name]) {
				throw new Error("SceneObject with name, '" + sceneObject.name + ",' already exists.");
			}

			this.sceneObjectsByName[sceneObject.name] = sceneObject;
			this.sceneObjects.push(sceneObject);
			sceneObject.scene = this;
		},
		getModel: function() {
			var model = JSON.parse(JSON.stringify(this.model)); // clone
			this.sceneObjects.forEach(function(sceneObject) {
				model.sceneObjects[sceneObject.name] = sceneObject.getModel();
			});

			return model;
		}
	}

	function create(name) {
		// default model
		var model = {
			modelType: 'Scene',
			name: name,
			sceneObjects: {}
		};

		return new Scene(model);
	}

	function load(json) {

	}

	return { create: create, load: load };
}());
/**
 * SceneManager
 */
function SceneManager(gameManager, context) {
	this._gameManager = gameManager;
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
			name: '',
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

/**
 * This is the master object.
 */
function GameManager(context) {
	this._sceneManagers = {};
	this._intervalId = null;

	// globals
	this.editMode = false;
	this._game = null;

	// managers
	this.sceneManager = new SceneManager(this, context)
	//this.assetManager ...
	//this.soundManager ...
}
GameManager.prototype = {
	constructor: GameManager,
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
			self.sceneManager.process(gameTime);
		}, frameInterval);
	},
	/**
	 * Stops the game timer.
	 */
	stopInterval: function() {
		clearInterval(this._intervalId);
	},
	setGame: function(game) {
		this._game = game;

		// load and display the start scene in the game
		//this.sceneManager.setScene(this._game.scenes[this._game.defaults.startSceneName]);
		this.sceneManager.setScene(this._game.getCurrentScene());
	}
};

	return { 
		GameManager: GameManager, 
		Game: Game, 
		SceneManager: SceneManager, 
		Scene: Scene, 
		SceneObject: SceneObject };
}());