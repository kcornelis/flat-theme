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
			html: {
				files: [ '**/*.html', '**/*.css', '**/*.js' ],
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
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/flat-theme.min.css': [ 'dist/flat-theme.css' ]
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

	grunt.registerTask('build', [ 'less', 'cssmin' ]);
	grunt.registerTask('default', [ 'build', 'concurrent' ]);
};