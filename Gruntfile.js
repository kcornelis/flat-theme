module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			less: {
				files: [ 'src/**/*.less' ],
				tasks: [ 'build' ]
			},
			js: {
				files: [ 'src/**/*.js' ],
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
			jquery: {
				files: {
					'dist/flat-theme.jquery.js': 'src/jquery/**/*.js'
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