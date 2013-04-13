// Generated on 2013-04-13 using generator-webapp 0.1.5
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function( grunt ) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  // configurable paths
  var yeomanConfig = {
      app:  'app',
      temp: '.tmp',
      dist: 'dist'
  };

  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({
    yeoman: yeomanConfig,

    // specify an alternate install location for Bower
    bower: {
      dir: '<%= yeoman.app %>/components'
    },

    // bower: {
    //     all: {
    //         rjsConfig: '<%= yeoman.app %>/scripts/main.js'
    //     }
    // }

    useminPrepare: {
        html: '<%= yeoman.app %>/index.html',
        options: {
            dest: '<%= yeoman.dist %>'
        }
    },
    usemin: {
        html: ['<%= yeoman.dist %>/{,*/}*.html'],
        css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
        options: {
            dirs: ['<%= yeoman.dist %>']
        }
    },
    imagemin: {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= yeoman.app %>/images',
                src: '{,*/}*.{png,jpg,jpeg}',
                dest: '<%= yeoman.dist %>/images'
            }]
        }
    },
    cssmin: {
        dist: {
            files: {
                '<%= yeoman.dist %>/styles/main.css': [
                    '<%= yeoman.temp %>/styles/{,*/}*.css',
                    '<%= yeoman.app %>/styles/{,*/}*.css'
                ]
            }
        }
    },
    htmlmin: {
        dist: {
            options: {
                /*removeCommentsFromCDATA: true,
                // https://github.com/yeoman/grunt-usemin/issues/44
                //collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true*/
            },
            files: [{
                expand: true,
                cwd: '<%= yeoman.app %>',
                src: '*.html',
                dest: '<%= yeoman.dist %>'
            }]
        }
    },
    copy: {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>',
                dest: '<%= yeoman.dist %>',
                src: [
                    '*.{ico,txt}',
                    '.htaccess'
                ]
            }]
        }
    },


    coffee: {
        dist: {
            files: [{
                // rather than compiling multiple files here you should
                // require them into your main .coffee file
                expand: true,
                cwd: '<%= yeoman.app %>/scripts',
                src: '*.coffee',
                dest: '<%= yeoman.temp %>/scripts',
                ext: '.js'
            }]
        },
        test: {
            files: [{
                expand: true,
                cwd: '<%= yeoman.temp %>/spec',
                src: '*.coffee',
                dest: 'test/spec'
            }]
        }
    },

    compass: {
        options: {
            sassDir: '<%= yeoman.app %>/styles',
            cssDir: '<%= yeoman.temp %>/styles',
            imagesDir: '<%= yeoman.app %>/images',
            javascriptsDir: '<%= yeoman.app %>/scripts',
            importPath: 'app/components',
            relativeAssets: true
        },
        dist: {},
        server: {
            options: {
                debugInfo: true
            }
        }
    },

    // default watch configuration
    watch: {
      coffee: {
        files: '<%= yeoman.app %>/scripts/**/*.coffee',
        tasks: 'coffee livereload'
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: [
          '<%= yeoman.app %>/styles/**/*.{scss,sass}'
        ],
        tasks: 'compass livereload'
      },
      livereload: {
          files: [
              '<%= yeoman.app %>/*.html',
              '{<%= yeoman.temp %>,<%= yeoman.app %>}/styles/{,*/}*.css',
              '{<%= yeoman.temp %>,<%= yeoman.app %>}/scripts/{,*/}*.js',
              '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,webp}'
          ],
          tasks: ['livereload']
      },
      handlebars: {
        files: [
          '<%= yeoman.app %>/scripts/templates/**/*.hbs'
        ],
        tasks: 'handlebars livereload'
      }
    },

    connect: {
        options: {
            port: 9000,
            // change this to '0.0.0.0' to access the server from outside
            hostname: '0.0.0.0'
        },
        livereload: {
            options: {
                middleware: function (connect) {
                    return [
                        lrSnippet,
                        mountFolder(connect, '<%= yeoman.temp %>'),
                        mountFolder(connect, '<%= yeoman.app %>')
                    ];
                }
            }
        },
        test: {
            options: {
                middleware: function (connect) {
                    return [
                        mountFolder(connect, '<%= yeoman.temp %>'),
                        mountFolder(connect, '<%= yeoman.app %>')
                    ];
                }
            }
        },
        dist: {
            options: {
                middleware: function (connect) {
                    return [
                        mountFolder(connect, '<%= yeoman.dist %>')
                    ];
                }
            }
        }
    },

    open: {
        server: {
            path: 'http://localhost:<%= connect.options.port %>'
        }
    },
    clean: {
        dist: ['<%= yeoman.temp %>', '<%= yeoman.dist %>/*'],
        server: '<%= yeoman.temp %>'
    },

    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
        dist: {}
    },*/
    uglify: {
        dist: {
            files: {
                '<%= yeoman.dist %>/scripts/main.js': [
                    '<%= yeoman.temp %>/scripts/{,*/}*.js'
                ],
            }
        }
    },

    // default lint configuration, change this to match your setup:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#lint-built-in-task
    lint: {
      files: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/**/*.js',
        'test/**/*.js'
      ]
    },

    // specifying JSHint options and globals
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },

    // Build configuration
    // -------------------

    // the staging directory used during the process
    staging: '<%= yeoman.temp %>',
    // final build output
    output: '<%= yeoman.dist %>',

    mkdirs: {
      staging: '<%= yeoman.app %>/'
    },

    // Below, all paths are relative to the staging directory, which is a copy
    // of the <%= yeoman.app %>/ directory. Any .gitignore, .ignore and .buildignore file
    // that might appear in the <%= yeoman.app %>/ tree are used to ignore these values
    // during the copy process.

    // concat css/**/*.css files, inline @import, output a single minified css
    css: {
      'styles/main.css': ['styles/**/*.css']
    },

    // renames JS/CSS to prepend a hash of their contents for easier
    // versioning
    // Hoodie pocket: referenced invalid image path so images don't get renamed
    // Workaround for: https://github.com/yeoman/yeoman/issues/824
    rev: {
      js: 'scripts/**/*.js',
      css: 'styles/**/*.css',
      img: 'i/**'
    },

    // HTML minification
    html: {
      files: ['index.html']
    },

    // Optimizes JPGs and PNGs (with jpegtran & optipng)
    img: {
      dist: '<config:rev.img>'
    },

    // rjs configuration. You don't necessarily need to specify the typical
    // `path` configuration, the rjs task will parse these values from your
    // main module, using http://requirejs.org/docs/optimization.html#mainConfigFile
    //
    // name / out / mainConfig file should be used. You can let it blank if
    // you're using usemin-handler to parse rjs config from markup (default
    // setup)
    rjs: {
      // no minification, is done by the min task
      optimize: 'none',
      baseUrl: './scripts',
      wrap: true
    },

    handlebars: {
      compile: {
        files: {
            "<%= yeoman.temp %>/scripts/compiled-templates.js": [
            "<%= yeoman.app %>/scripts/templates/**/*.hbs"
          ]
        },
        options: {
          // namespace: 'pocket.Templates',
          namespace: 'JST',
          processName: function(filename) {
            // funky name processing here
            return filename
                    .replace(/^app\/scripts\/templates\//, '')
                    .replace(/\.hbs$/, '');
          }
        }
      }
    }
  });

  // Alias the `test` task to run the `mocha` task instead
  // grunt.registerTask('test', ['mocha']);

  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', function (target) {
      if (target === 'dist') {
          return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
      }

      grunt.task.run([
          'clean:server',
          'coffee:dist',
          'handlebars',
          'compass:server',
          'livereload-start',
          'connect:livereload',
          'open',
          'watch'
      ]);
  });

  grunt.registerTask('test', [
      'clean:server',
      'coffee',
      'compass',
      'connect:test',
      'mocha'
  ]);

  grunt.registerTask('build', [
      'clean:dist',
      'coffee',
      'handlebars',
      'compass:dist',
      'useminPrepare',
      'imagemin',
      'htmlmin',
      'concat',
      'cssmin',
      'uglify',
      'copy',
      'usemin'
  ]);

  grunt.registerTask('default', [
      'jshint',
      'test',
      'build'
  ]);
};
