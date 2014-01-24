/*global module:false*/

module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-browserify');


  // Project configuration.
  grunt.initConfig({

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
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'compass', 'browserify'],
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
        dest: 'app/dist/bundle.js',
        options: {
          debug: true,
          shim: {
            jquery: {
              path: 'libs/jquery/jquery.js',
              exports: '$'
            },
            gridster: {
              path: 'libs/gridster/src/jquery.gridster.js',
              exports: '$.fn.gridster',
              depends: {
                jquery: '$'
              }
            }
          }
        }
      }
    }

  });

  // Default task.
  grunt.registerTask('default', ['jshint']);

};
