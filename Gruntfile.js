module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			engine: {
				src: ['src/engine/main.js'],
				dest: 'build/web/js/engine.js'
			}
		},
		copy: {
			web: {
				expand: true,
				cwd: 'src/web/',
				src: ['**'],
				dest: 'build/web/'
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