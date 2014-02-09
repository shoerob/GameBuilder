module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			engine: {
				src: [
					'src/engine/buildStart.js',
					'src/common/utils.js',
					'src/engine/GameTime.js',
					'src/engine/SceneObject.js',
					'src/engine/Scene.js',
					'src/engine/SceneManager.js',
					'src/engine/Game.js',
					'src/engine/GameManager.js',
					'src/engine/buildEnd.js'
					],
				dest: 'build/js/engine.js'
			},
			extensions: {
				src: [
					'src/extensions/buildStart.js',
					'src/extensions/SnowSceneObject.js',
					'src/extensions/buildEnd.js'
				],
				dest: 'build/js/extensions.js'
			},
			gameBuilder: {
				src: [
					'src/gameBuilder/GameBuilder.js'
				],
				dest: 'build/js/GameBuilder.js'
			}
		},
		copy: {
			web: {
				expand: true,
				cwd: 'build/js/',
				src: ['**'],
				dest: 'web/js'
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s)
	grunt.registerTask('default', ['concat', 'copy']);

	// clean the build folder
	grunt.registerTask("clean", function(){
		grunt.file.delete("build");
	});
}