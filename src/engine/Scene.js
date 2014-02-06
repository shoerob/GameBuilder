var Scene = (function() {
	/**
	 * Scene
	 */
	function Scene(name) {
		this.name = name;
		this._sceneObjects = [];
	}
	Scene.prototype = {
		constructor: Scene,
		update: function() {
			this._sceneObjects.forEach(function(sceneObject) {
				sceneObject.update();
			});
		},
		render: function(ctx) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			this._sceneObjects.forEach(function(sceneObject) {
				sceneObject.render(ctx);
			});
		},
		addSceneObject: function(sceneObject) {
			this._sceneObjects.push(sceneObject);
		}
	}
	return Scene;
}());