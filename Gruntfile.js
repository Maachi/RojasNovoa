module.exports = function(grunt) {

	require('time-grunt')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		dev: "static",

		prod: "bin",

		// Validate JS
		jshint: {
			all: [
				"Gruntfile.js",
				"<%= dev %>/static/javascript/**/*.js"
			]
		},


		less: {
			css: {
				files: {
					'<%= dev %>/css/rojasnovoa.css': '<%= dev %>/css/less/main.less'
				},
				options: {
					sourceMap: false
				},
			}
		},


		autoprefixer: {
			options: {
				browsers: ['last 4 versions']
			},
			css: {
				files: {
					'<%= dev %>/css/rojasnovoa.css': '<%= dev %>/css/rojasnovoa.css'
				}
			}
		},

		useminPrepare:{
			html: ['index.html'],
			options:{
				dest: '<%= prod %>',
			}
		},

		usemin:{
			html:['<%= prod %>/*.html'],
			css: ['<%= prod %>/static/css/*.css'],
			options: {
				dirs: ['<%= prod %>'],
				assetsDirs: ['<%= prod %>']
			}
		},

		clean: ['<%= prod %>'],

		copy: {
			main: {
				files: [
					// media
					{
						expand: true,
						cwd: '',
						src: [
							'static/fonts/**',
							'static/img/**',
							'*.html'
						],
						dest: '<%= prod %>/'
					}
				]
			}
		},


		version: {
			options: {
				release: 'patch'
			},
			patch: {
				src: ['package.json', 'bower.json', '<%= prod %>/js/*.js']
			},
			minor:{
				options: {
					release: 'minor'
				},
				src: ['package.json', 'bower.json', '<%= prod %>/js/*.js']
			},
			major:{
				options: {
					release: 'major'
				},
				src: ['package.json', 'bower.json', '<%= prod %>/js/*.js']
			}
		}

	});

	// Load project tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-filerev-replace');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-version');
	grunt.loadNpmTasks('grunt-ng-annotate');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'less', 'autoprefixer']);
	grunt.registerTask('build', ['default', 'clean', 'useminPrepare', 'concat', 'uglify', 'cssmin',  'copy:main', 'usemin', 'version:patch']);
};