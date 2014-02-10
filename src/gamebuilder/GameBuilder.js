var GameBuilder = (function() {
	function GameBuilder(editorCanvas) {
		this.gameManager = new engine.GameManager(editorCanvas.getContext('2d'));
		this.gameManager.mode = 'edit';

		// start rendering
		this.gameManager.startInterval(1);

		this.game = null;
	}
	GameBuilder.prototype = {
		createGame: function() {
			this.game = engine.Game.create();
			this.gameManager.setGame(this.game);
		},
		createScene: function() {

		},
		createSceneObject: function() {
			var sceneObject = engine.SceneObject.create('' + Math.random() * 6000);
			sceneObject.position.x = Math.random() * 640;
			sceneObject.position.y = Math.random() * 480;
			this.game.getCurrentScene().addSceneObject(sceneObject);
		},
		saveGame: function() {
			//console.log(this.game.save());
			console.log(this.game.getModel());
		}
	};

	return GameBuilder;
}());