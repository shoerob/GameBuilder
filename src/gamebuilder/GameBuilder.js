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

			// provide it with a default scene
			var defaultScene = engine.Scene.create('default');

			// provide it with a default SceneObject
			var sceneObject = engine.SceneObject.create('default');
			defaultScene.addSceneObject(sceneObject);

			// add the scene to the game, and start the game
			this.game.addScene(defaultScene);
			this.game.startSceneName = 'default';
			this.game.init();

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