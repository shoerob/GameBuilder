/**
 * This is the master object.
 */
function GameManager(context) {
	this._sceneManagers = {};
	this._intervalId = null;

	// globals
	this.mode = 'edit'; // or 'run'
	this._game = null;

	// managers
	this.sceneManager = new SceneManager(context)
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
		this.sceneManager.setScene(this._game.scenes[this._game.defaults.startSceneName]);
	}
};