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
        'app/js/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      files: ['<%= jshint.files %>', 'app/scss/*.scss'],
      tasks: ['jshint', 'compass', 'browserify', 'hapi'],
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
      build: {
        src: ['app/js/app.js'],
        dest: 'app/dist/pocket.js',
        options: {
          debug: true,
          shim: {
            jquery: {
              path: 'libs/jquery/jquery.js',
              exports: '$'
            },
            gridster: {
              path: 'libs/jquery.gridster.with-extras.js/index.js',
              exports: '$.fn.gridster',
              depends: {
                jquery: '$'
              }
            }
          }
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'app/dist/<%= pkg.name %>.min.js': 'app/dist/pocket.js'
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
  grunt.registerTask('build', ['jshint', 'compass', 'browserify']);

  grunt.registerTask('server', ['hapi', 'watch']);

};
