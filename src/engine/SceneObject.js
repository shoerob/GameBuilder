/**
* SceneObject
*/
function SceneObject(name) {
	this.name = name;
}
SceneObject.prototype = {
	constructor: SceneObject,
	update: function(gameTime) { },
	render: function(ctx) { }
}
