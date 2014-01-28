/*global module:false*/

module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');


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
    }


  });

  // Default task.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jshint', 'compass', 'browserify']);

};
