function SnowSceneObject(name, particles, left, top, width, height) {
	engine.SceneObject.call(this, name);

	this.particles = [];
	for (var i = 0; i < particles; i++) {
		this.particles.push({ x: Math.random()*width+left, y: Math.random()*height+top });
	}

	this.left = left;
	this.top = top;
	this.width = width;
	this.height = height;
}
SnowSceneObject.prototype = Object.create(engine.SceneObject.prototype);
SnowSceneObject.prototype.constructor = SnowSceneObject;
SnowSceneObject.prototype.update = function(gameTime) {
	var timePassed = gameTime.getTimePassed()/60;
	this.particles.forEach(function(particle) {
		particle.y += 1 * timePassed;
		particle.x += (Math.random() * 2 - 1) * timePassed;

		if (particle.y > this.top+this.height) {
			particle.y = this.top;
		}
		if (particle.x > this.left+this.width+4) {
			particle.x = this.left;
		}
		if (particle.x < this.left-4) {
			particle.x = this.left+this.width;
		}
	}.bind(this));
}
SnowSceneObject.prototype.render = function(ctx) {
	this.particles.forEach(function(particle) {
		ctx.fillStyle = "rgba(0, 200, 0, 0.5)";
	    ctx.fillRect (particle.x, particle.y, 4, 4);
	});
}