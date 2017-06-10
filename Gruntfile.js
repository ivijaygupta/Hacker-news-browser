// Gruntfile.js
module.exports = function(grunt) {
    grunt.initConfig({

        // grunt sass
        sass: {
            dev: {
				options: {
					style: 'compressed',
                    sourcemap: 'none',
                    noCache: true,
					// defaultEncoding: 'utf-8'
				},
				files: [
					{
						'css/app.css': 'css/app.scss',
					}
				]
			}
        },

        // watch
        watch: {
			css: {
				files: '**/*.scss',
				tasks: 'sass:dev'
			},
			html: {
	            files: '**/*.html'
	        },
            js: {
	            files: 'js/**/*.js',
                tasks: 'uglify:dev'
	        },
            options: {
	            livereload: true,
            }
		},

		// connect
		connect: {
			server: {
				options: {
					port: 1986,
					open: true,
					livereload: true,
					hostname: 'localhost'
				}
			}
		},

        // Copy
        copy: {
            main: {
                expand: true,
                src: [
                    '**/*',
                    '!css/**/*.scss',
                    '!js/**/*.js',
                    'js/app.min.js'
                    ,'!**/Design/**',
                    '!**/node_modules/**',
                    '!.gitignore',
                    '!package.json',
                    '!Gruntfile.js'
                ],
                dest: 'build/',
            },
        },

        // Grunt Clean
        clean: {
            build: ['build'],
            // release: ['path/to/another/dir/one', 'path/to/another/dir/two'],
            // folder: ['path/to/dir/'],
            // folder_v2: ['path/to/dir/**'],
            // contents: ['path/to/dir/*'],
            // subfolders: ['path/to/dir/*/'],
            // css: ['path/to/dir/*.css'],
            // all_css: ['path/to/dir/**/*.css']
        },

        // Uglify JS
        uglify: {
            dev: {
                files: {
                    'js/app.min.js': [
                        'js/angular.min.js',
                        'js/moment.min.js',
                        'js/angular-moment.min.js',
                        'js/angular-sanitize.min.js',
                        'js/loading-bar.js',
                        'js/jquery-3.2.1.min.js',
                        'js/app.js'
                    ]
                },
                options: {
                    mangle: false
                }
            }
        }

    });


    // create tasks
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // register tasks
    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('build', ['clean', 'sass:dev', 'copy']);

};
