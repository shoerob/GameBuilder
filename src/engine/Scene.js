var Scene = (function Scene() {

	function Scene(model) {
		this.model = model;
		this.name = model.name;
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

		// create the scene
		var scene = new Scene(model);

		// TODO: we shouldn't provide default children here

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