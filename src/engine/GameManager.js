/**
 * This is the master object.
 */
function GameManager() {
	this._sceneManagers = {};
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