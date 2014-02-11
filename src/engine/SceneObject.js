var SceneObject = (function() {
	/**
	* SceneObject
	*/
	function SceneObject(model) {
		this.model = model;

		this.name = model.name;
		this.position = { x: model.position.x, y: model.position.y };
		this.bounds = { width: model.bounds.width, height: model.bounds.height };
		this.behavior = model.behavior;

		this.scene = null; // parent
	}
	SceneObject.prototype = {
		constructor: SceneObject,
		resetFromModel: function() {
			this.position = { x: this.model.position.x, y: this.model.position.y };
			this.bounds = { width: this.model.bounds.width, height: this.model.bounds.height };
			this.behavior = this.model.behavior;
		},
		update: function(gameTime) { 
			// this.position.y++;
			eval(this.behavior);
		},
		render: function(ctx) {
			ctx.fillStyle = "rgba(0, 200, 0, 0.5)";
		    ctx.fillRect(
		    	this.position.x - this.bounds.width/2, 
		    	this.position.y - this.bounds.height/2, 
		    	this.bounds.width,
		    	this.bounds.height);
		},
		getModel: function() {
			var model = JSON.parse(JSON.stringify(this.model)); // clone
			return model;
		}
	}

	function create(name) {
		// default model
		var model = {
			modelType: 'SceneObject',
			name: name,
			position: { x: 320, y: 240 },
			bounds: { width: 25, height: 25 },
			behavior: null
		};

		return new SceneObject(model);
	}

	function load(json) {

	}

	return { create: create, load: load }
}());