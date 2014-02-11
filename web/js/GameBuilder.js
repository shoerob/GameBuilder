var GameBuilder = (function() {
	function GameBuilder(editorCanvas) {
		this.gameManager = new engine.GameManager(editorCanvas.getContext('2d'));
		this.gameManager.paused = true;

		// start rendering
		this.gameManager.startInterval(1);

		this.game = null;
	}
	GameBuilder.prototype = {
		createGame: function() {
			this.game = engine.Game.create('default');

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

			// TODO: we should pass in a model here instead of setting properties directly
			// the game editor should ONLY interact with the model, and NOT state properties
			// any game editing behaviors should ONLY interact with the model as well
			// the update() function should NOT be called when in edit mode
			// the model could probably have an event subscribed to by the host that
			// triggers a host update on model updates

			var sceneObject = engine.SceneObject.create('' + Math.random() * 6000);
			sceneObject.model.position.x = Math.random() * 640;
			sceneObject.model.position.y = Math.random() * 480;
			sceneObject.model.behavior = "this.position.y++;";
			sceneObject.resetFromModel();
			this.game.getCurrentScene().addSceneObject(sceneObject);
		},
		saveGame: function() {
			//console.log(this.game.save());
			console.log(this.game.getModel());
		},
		play: function() {
			console.log("Playing...");
			this.gameManager.paused = false;
		},
		stop: function() {
			console.log("Pausing...");
			this.gameManager.paused = true;
			this.game.resetFromModel();
		}
	};

	return GameBuilder;
}());