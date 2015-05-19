module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			less: {
				files: [ 'theme/**/*.less' ],
				tasks: [ 'build' ],
				options: {
					livereload: false
				}
			},
			js: {
				files: [ 'scripts/**/*.js' ],
				tasks: [ 'build' ],
				options: {
					livereload: false
				}
			},			
			html: {
				files: [ '**/*.html', 'dist/**/*.css', 'dist/**/*.js' ],
				options: {
					livereload: 35750
				}
			}
		},
		less: {
			main: {
					options: {
					paths: ['theme']
				},
				files: {
					'dist/flat-theme.css': 'theme/main.less'
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
				advanced: false
			},
			target: {
				files: {
					'dist/flat-theme.min.css': [ 'dist/flat-theme.css' ]
				}
			}
		},
		ngmin: {
			main: {
				files: {
					'dist/flat-theme.js': 'scripts/**/*.js'
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

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-ngmin');

	grunt.registerTask('build', [ 'less', 'cssmin', 'ngmin' ]);
	grunt.registerTask('default', [ 'build', 'concurrent' ]);
};