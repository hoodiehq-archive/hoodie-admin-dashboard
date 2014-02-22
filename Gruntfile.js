/*global module:false*/

var path = require('path');

module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-hapi');


  // Project configuration.
  grunt.initConfig({

    pkg: require('./package.json'),

    jshint: {
      files: [
        'Gruntfile.js',
        'app/js/**/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      files: ['<%= jshint.files %>', 'app/scss/*.scss', 'app/js/*.html', 'app/js/**/*.hbs'],
      tasks: ['jshint', 'compass', 'browserify:app', 'hapi'],
      options: {
        livereload: true
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'app/scss',
          cssDir: 'app/css',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'app/scss',
          cssDir: 'app/css'
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
            routeFilter: {
              path: 'libs/backbone.routefilter/index.js',
              exports: 'Backbone.Router',
              depends: {
                backbone: 'Backbone'
              }
            }

          }
        },
        src: ['./libs/*.js'],
        dest: 'app/dist/libs.js'
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
            './libs/jquery.gridster.with-extras.js/index.js:gridster',
            './libs/backbone.routefilter/index.js:routefilter'
          ],
          external: [
            './libs/jquery/jquery.js',
            './libs/lodash/dist/lodash.js',
            './libs/underscore/underscore.js',
            './libs/backbone/backbone.js',
            './libs/backbone.babysitter/lib/backbone.babysitter.js',
            './libs/backbone.wreqr/lib/backbone.wreqr.js',
            './libs/backbone.marionette/lib/backbone.marionette.js',
            './libs/jquery.gridster.with-extras.js/index.js',
            './libs/backbone.routefilter/index.js'
          ]
        },
        src: ['app/js/init.js'],
        dest: 'app/dist/pocket.js',
      }
    },

    uglify: {
      dist: {
        files: {
          'app/dist/<%= pkg.name %>.min.js': ['app/dist/libs', 'app/dist/pocket.js']
        }
      }
    },

    hapi: {
      custom_options: {
        options: {
          server: path.resolve('./server'),
          bases: {
            '/': './app'
          }
        }
      }
    },

  });

  // Default task.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jshint', 'compass', 'browserify', 'uglify']);

  grunt.registerTask('server', ['hapi', 'watch']);

};
