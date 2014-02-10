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