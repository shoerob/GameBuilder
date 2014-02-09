var SceneObject = (function() {
	/**
	* SceneObject
	*/
	function SceneObject(name) {
		this.name = name;
	}
	SceneObject.prototype = {
		constructor: SceneObject,
		update: function(gameTime) { },
		render: function(ctx) {
			ctx.fillStyle = "rgba(0, 200, 0, 0.5)";
		    ctx.fillRect (320, 240, 25, 25);
		}
	}

	function create(name) {
		return new SceneObject(name);
	}

	function load(json) {

	}

	return { create: create, load: load }
}());