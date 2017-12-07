module.exports = function (grunt) {
    
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			scripts: {
				files: ["../app/**/**/*.js", "../app/*.js", "!node_modules/**/*.js"],
				tasks: ["eslint"],
				options: {
					spawn: false,
				},
			},
		},
		eslint: {
			src: [
				"./app/**/**/*.js",
				"./app/*.js",
				"!node_modules/**/*.js",
			],
		},
	})
    
	// Load each plugin that provides each task.
	grunt.loadNpmTasks("grunt-contrib-watch")
	grunt.loadNpmTasks("gruntify-eslint")
    
	// Default task(s).
	grunt.registerTask("default", ["eslint", "watch"])
}  