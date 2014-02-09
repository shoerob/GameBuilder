/**
 * Scene
 */
function Scene(name) {
	this.name = name;
	this._sceneObjects = [];
	this._sceneObjectsByName = {};
}
Scene.prototype = {
	constructor: Scene,
	update: function(gameTime) {
		this._sceneObjects.forEach(function(sceneObject) {
			sceneObject.update(gameTime);
		});
	},
	render: function(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		this._sceneObjects.forEach(function(sceneObject) {
			sceneObject.render(ctx);
		});
	},
	addSceneObject: function(sceneObject) {
		if (this._sceneObjectsByName[sceneObject.name]) {
			throw new Error("SceneObject with name, '" + sceneObject.name + ",' already exists.");
		}

		this._sceneObjectsByName[sceneObject.name] = sceneObject;
		this._sceneObjects.push(sceneObject);
	}
}
