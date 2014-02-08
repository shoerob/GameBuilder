var GameTime = (function() {

	/**
	 * This keeps track of current and elapsed game times.
	 */
	function GameTime() {
		this._time = new Date().getTime();
		this._timePassed = 0;
	}
	GameTime.prototype = {
		constructor: GameTime,
		/**
		 * Updates the current and elapsed times.
		 */
		update: function() {
			this._timePassed = this._time;
			this._time = new Date().getTime();
			this._timePassed = this._time - this._timePassed;
		},
		/**
		 * Gets the current game time.
		 * @return {number} The current game time in milliseconds.
		 */
		getTime: function() {
			return this._time;
		},
		/**
		 * Gets the amount of time that passed since update was last called.
		 * @return {number} The time passed since last update in milliseconds.
		 */
		getTimePassed: function() {
			return this._timePassed;
		}
	};

	return GameTime;
}());