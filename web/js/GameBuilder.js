var GameBuilder = (function() {
	function GameBuilder(editorCanvas) {
		this.gameManager = new engine.GameManager(editorCanvas.getContext('2d'));

		// start rendering
		this.gameManager.startInterval(1);

		this.activeGame = null;
	}
	GameBuilder.prototype = {
		createGame: function() {
			var game = engine.Game.create();
			this.gameManager.mode = 'edit';
			this.gameManager.setGame(game);
			return game;
		},
		createScene: function() {

		},
		createSceneObject: function(scene) {

		}
	};

	return GameBuilder;
}());