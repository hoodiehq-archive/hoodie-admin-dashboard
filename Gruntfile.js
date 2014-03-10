/*global module:false*/

module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-hoodie');

  // Project configuration.
  grunt.initConfig({

    pkg: require('./package.json'),

    jshint: {
      files: [
        'Gruntfile.js',
        'www/js/**/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      files: ['<%= jshint.files %>', 'www/scss/*.scss', 'www/js/*.html', 'app/js/**/*.hbs'],
      tasks: ['jshint', 'compass', 'browserify:app'],
      options: {
        livereload: true
      }
    },

    hoodie: {
      start: {
        options: {
          callback: function (config) {
            grunt.config.set('cfg', config);
          }
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'www',
          hostname: '0.0.0.0',
          middleware: function (connect, options) {
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            return [
              proxy,
              connect.static(options.base),
              connect.directory(options.base)
            ];
          }
        },
        proxies: [
          {
            context: '/_api',
            host: '<%= cfg.stack.www.host %>',
            port: '<%= cfg.stack.www.port %>'
          }

        ]
      }
    },


    compass: {
      dist: {
        options: {
          sassDir: 'www/scss',
          cssDir: 'www/css',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'www/scss',
          cssDir: 'www/css'
        }
      }

    },

    browserify: {
      libs: {
        options: {
          shim: {
            jquery: {
              path: 'libs/jquery/jquery.js',
              exports: '$'
            },
            lodash: {
              path: 'libs/lodash/dist/lodash.js',
              exports: '_'
            },
            underscore: {
              path: 'libs/underscore/underscore.js',
              exports: '_'
            },
            backbone: {
              path: 'libs/backbone/backbone.js',
              exports: 'Backbone',
              depends: {
                underscore: 'underscore'
              }
            },
            'backbone.babysitter': {
              path: 'libs/backbone.babysitter/lib/backbone.babysitter.js',
              exports: 'Backbone.Babysitter',
              depends: {
                backbone: 'Backbone'
              }
            },
            'backbone.wreqr': {
              path: 'libs/backbone.wreqr/lib/backbone.wreqr.js',
              exports: 'Backbone.Wreqr',
              depends: {
                backbone: 'Backbone'
              }
            },
            'backbone.marionette': {
              path: 'libs/backbone.marionette/lib/backbone.marionette.js',
              exports: 'Marionette',
              depends: {
                jquery: '$',
                backbone: 'Backbone',
                underscore: '_'
              }
            },
            gridster: {
              path: 'libs/jquery.gridster.with-extras.js/index.js',
              exports: '$.fn.gridster',
              depends: {
                jquery: '$'
              }
            },
            barf: {
              path: 'node_modules/barf/dist/barf.js',
              exports: 'Backbone.Router',
              depends: {
                backbone: 'Backbone'
              }
            }
          }
        },
        src: ['./libs/*.js'],
        dest: 'www/dist/libs.js'
      },
      app: {
        options: {
          standalone: 'app',
          //debug: true,
          transform: [
            'hbsfy'
          ],
          alias: [
            './libs/jquery/jquery.js:jquery',
            './libs/lodash/dist/lodash.js:lodash',
            './libs/underscore/underscore.js:underscore',
            './libs/backbone/backbone.js:backbone',
            './libs/backbone.babysitter/lib/backbone.babysitter.js:backbone.babysitter',
            './libs/backbone.wreqr/lib/backbone.wreqr.js:backbone.wreqr',
            './libs/backbone.marionette/lib/backbone.marionette.js:backbone.marionette',
            './libs/jquery.gridster.with-extras.js/index.js:gridster'
          ],
          external: [
            './libs/jquery/jquery.js',
            './libs/lodash/dist/lodash.js',
            './libs/underscore/underscore.js',
            './libs/backbone/backbone.js',
            './libs/backbone.babysitter/lib/backbone.babysitter.js',
            './libs/backbone.wreqr/lib/backbone.wreqr.js',
            './libs/backbone.marionette/lib/backbone.marionette.js',
            './libs/jquery.gridster.with-extras.js/index.js'
          ]
        },
        src: ['www/js/init.js'],
        dest: 'www/dist/pocket.js',
      }
    },

    uglify: {
      dist: {
        files: {
          'www/dist/<%= pkg.name %>.min.js': ['www/dist/libs', 'www/dist/pocket.js']
        }
      }
    },

  });

  // Default task.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jshint', 'compass', 'browserify', 'uglify']);

  grunt.registerTask('serve', [
    'hoodie',
    'connect:server',
    'configureProxies:server',
    'watch'
  ]);

};
