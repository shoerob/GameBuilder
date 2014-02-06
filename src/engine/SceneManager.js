var SceneManager = (function() {
	/**
	 * SceneManager
	 */
	function SceneManager(name, context) {
		this.name = name;
		this._ctx = context;
		this._scene = null;
		this._intervalId = null;
	}
	SceneManager.prototype = {
		constructor: SceneManager,
		process: function() {
			if (this._scene) {
				this._scene.update();
				this._scene.render(this._ctx);
			}
		},
		setScene: function(scene) {
			this._scene = scene;
		}
	}

	return SceneManager;
}());