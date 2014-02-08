/**
* SceneObject
*/
function SceneObject(name, initFunc, updateFunc, renderFunc) {
	this.name = name;
	initFunc(this);
	this.update = updateFunc;
	this.render = renderFunc;
}
SceneObject.prototype = {
	constructor: SceneObject,
	update: function(gameTime) { },
	render: function(ctx) { }
}
