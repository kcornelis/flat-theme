module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			less: {
				files: [ 'src/**/*.less' ],
				tasks: [ 'build' ]
			},
			js: {
				files: [ 'src/**/*.js', 'demo/**/*.js' ],
				tasks: [ 'build' ]
			}
		},
		less: {
			main: {
				options: {
					paths: ['src/theme'],
					sourceMap: true,
					sourceMapURL: './flat-theme.css.map',
					sourceMapRootpath: '../'
				},
				files: {
					'dist/flat-theme.css': 'src/theme/main.less'
				}
			}
		},
		concat: {
			options: {
				sourceMap: true,
			},
			jquery: {
				src: [ 'src/jquery/tools/*.js', 'src/jquery/*.js' ],
				dest: 'dist/flat-theme.jquery.js'
			},
			angular: {
				src: [ 'src/angular/module.js', 'src/angular/config/**/*.js', 'src/angular/directives/**/*.js' ],
				dest: 'dist/flat-theme.angular.js'
			},
			bootstrap: {
				src: [ 'vendor/normalize/normalize.css', 'vendor/bootstrap/css/bootstrap.css' ],
				dest: 'dist/bootstrap.css'
			},
			angulardemo: {
				src: [ 'demo/angular/controllers/**/*.js' ],
				dest: 'demo/angular/controllers.js'
			}
		},
		cssmin: {
			options: {
				keepSpecialComments: 0,
				shorthandCompacting: false,
				roundingPrecision: -1,
				advanced: false
			},
			target: {
				files: {
					'dist/flat-theme.min.css': [ 'dist/flat-theme.css' ],
					'dist/bootstrap.min.css': [ 'dist/bootstrap.css' ]
				}
			}
		},		
		uglify: {
			jquery: {
				files: {
					'dist/flat-theme.jquery.min.js': 'dist/flat-theme.jquery.js'
				}
			},
			angular: {
				files: {
					'dist/flat-theme.angular.min.js': 'dist/flat-theme.angular.js'
				}
			}
		},		
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: [ '--debug' ]
				}
			}
		},
		concurrent: {
			default: [ 'nodemon', 'watch' ],
			debug: [ 'nodemon', 'watch' ],
			options: {
				logConcurrentOutput: true
			}
		},
	});
	
	grunt.registerTask('build', [ 'less', 'cssmin', 'concat', 'uglify' ]);
	grunt.registerTask('default', [ 'build', 'concurrent' ]);
};