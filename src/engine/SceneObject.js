var SceneObject = (function() {
	/**
	* SceneObject
	*/
	function SceneObject() {

	}
	SceneObject.prototype = {
		constructor: SceneObject,
		update: function() {

		},
		render: function(ctx) {
	    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
	    ctx.fillRect (30, 30, 55, 50);
		}
	}

	return SceneObject;
}());