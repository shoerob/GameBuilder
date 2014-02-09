var Scene = (function Scene() {

	/**
	 * Scene
	 */
	function Scene(name) {
		this.name = name;
		this.sceneObjects = [];
		this.sceneObjectsByName = {};
	}
	Scene.prototype = {
		constructor: Scene,
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
		}
	}

	function create(name) {
		// create the scene
		var scene = new Scene(name);

		// provide it with a default SceneObject
		var sceneObject = engine.SceneObject.create('default');
		scene.sceneObjects.push(sceneObject);
		scene.sceneObjectsByName['default'] = sceneObject;

		return scene;
	}

	function load(json) {

	}

	return { create: create, load: load };
}());